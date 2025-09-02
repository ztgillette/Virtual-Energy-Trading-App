'use client';

//styling
import '@arco-design/web-react/dist/css/arco.css';
import enUS from '@arco-design/web-react/es/locale/en-US';
import {
  Layout, Grid, Space, Card, Typography, Statistic, Spin, Empty, ConfigProvider
} from '@arco-design/web-react';

//other imports
import { useState } from 'react';
import { getDayAheadData, getRealTimeData } from './api';
import PriceChart from './components/PriceChart';
import NextDayButton from './components/NextDayButton';
import {getNextDay} from './lib/date'
import BidForm from './components/BidForm';
import BidTable from './components/BidTable';
import ConfirmedBidTable from './components/ConfirmedBidTable';
import type { Bid } from './components/BidForm';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function App() {
  const [date, setDate] = useState<string>('2024-11-15');
  const [time, setTime] = useState<string>('10:59 am');

  const [dam, setDam] = useState<number[] | null>(null);
  const [rtm, setRtm] = useState<number[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [bids, setBids] = useState<Bid[]>([]);
  const [confirmedBids, setConfirmedBids] = useState<Bid[]>([]);

  const [nextButtonText, setNextButtonText] = useState<string>("Finish Placing Bids");

  const [totalProfit, setTotalProfit] = useState<number>(0);

  const [bidsPerHour, setBidsPerHour] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

  // Called by the button
  const handleNextDay = async () => {
    try {
      setLoading(true);
      const next = getNextDay(date); 
      setDate(next);
      
      //set all confirmed bids
      let tomorrow_bids: Bid[] = [];
      for(let i=0; i<bids.length; i++) {
        if(bids[i].status == "Success") {
          tomorrow_bids.push(bids[i]);
        }
      }
      setConfirmedBids(tomorrow_bids);

      //reset bids
      setBids([]);

      setNextButtonText("Finish Placing Bids")
      setTime("10:59 am");
      setRtm([]);
     
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleFinishBidding = async () => {

    try {
        setLoading(true);
        setError(null);
        const data = await getDayAheadData(getNextDay(date));
        setDam(data);

        //see which bids were successful
        const checked_bids: Bid[] = [];
        for(let i=0; i<bids.length; i++) {

          //current bid
          let bid: Bid = bids[i];
          let hour: number = bid.hour;
          let price: number = bid.price;

          //dam price
          let dam_price = -1;
          if(data != null) {
            dam_price = data[hour];
          }

          let status: string = "Failure";
          if((bid.type == "BUY" && price >= dam_price) || (bid.type == "SELL" && price <= dam_price)) {
            status = "Success";
          } 

          //make new bid
          const new_bid: Bid = {
            hour: bid.hour,   
            type: bid.type,
            price: bid.price,
            quantity: bid.quantity,
            damPrice: dam_price,
            status: status,
            rtmPrice: undefined,
            profit: undefined
          };

          checked_bids.push(new_bid);

        }
        setBids(checked_bids);


      } catch (e: any) {
        setError(e?.message ?? String(e));
      } finally {
        setLoading(false);
    }

    //clear max bids per hour counter
    setBidsPerHour([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    setNextButtonText("Simulate Daily Earnings")
    setTime("11:00 am");

  };

  const handleTodaysWinnings = async () => {

    try {
        setLoading(true);
        setError(null);
        const data = await getRealTimeData(date);
        setRtm(data);

        //calculate average price per hour
        let average_prices: number[] = [];
        for(let i=0; i<24; i++) {

          let average_price = 0;
          //12 5min intervals per hour
          for(let j=0; j<12; j++) {
            let index = (12*i) + j;
            average_price += data[index];
          }
          average_price /= 12;
          average_prices.push(average_price);

        }

        //see how much money we made (or lost)
        let daily_profit: number = 0;
        let settled_bids: Bid[] = [];
        for(let i=0; i<confirmedBids.length; i++) {

          let bid: Bid = confirmedBids[i];
          let hour: number = bid.hour;
          let price: number | undefined = bid.damPrice;
          if(price == undefined) {
            price = 0;
          }
          let type = bid.type;
          let quantity: number = bid.quantity;

          let rtm_avg_price: number = average_prices[hour];

          let profit: number = 0;
          //buy
          if(type == "BUY") {
            profit = (rtm_avg_price - price) * quantity;
          }
          //sell
          else {
            profit = (price - rtm_avg_price) * quantity;
          }

          daily_profit += profit;

          //build out settled bid
          let settled_bid: Bid = {
            hour: bid.hour,   
            type: bid.type,
            price: bid.price,
            quantity: bid.quantity,
            damPrice: bid.damPrice,
            status: bid.status,
            rtmPrice: Number(rtm_avg_price.toFixed(2)),
            profit: Number(profit.toFixed(2))
          }

          settled_bids.push(settled_bid);

        }

        setTotalProfit(totalProfit + daily_profit);

        //update today's bids table
        setConfirmedBids(settled_bids);

      } catch (e: any) {
        setError(e?.message ?? String(e));
      } finally {
        setLoading(false);
    }

    setNextButtonText("Continue to Next Day...")
    setTime("11:59 pm");
    

  }

  const handleNextButton = async () => {

    if(time == "10:59 am") {
      handleFinishBidding();
    } else if (time == "11:00 am") {
      handleTodaysWinnings();
    } else if (time == "11:59 pm") {
      handleNextDay();
    }
    
  }

  const handleBidSubmit = (bid: Bid) => {

    //confirm <=10 bids per hour
    if(bidsPerHour[bid.hour] < 10) {
      bidsPerHour[bid.hour]++;
      setBids(prev => [...prev, bid]);
    } else {
      console.log("Error: Maximum bids per hour reached.")
    }
    
    
  };

  return (
    <ConfigProvider locale={enUS}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Title style={{ color: 'rgb(245, 191, 85)', textShadow: '1px 1px 2px #000',  fontWeight: 'bold', margin: 0, padding: 24, paddingBottom: 0}}>
            Virtual Energy Trader
          </Title>
          <p style={{margin: 0, paddingTop: 0, paddingLeft: 24}}>Zach Gillette, 2025</p>
        </Header>

        <Content style={{ padding: 24 }}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>

            {/* Top status + button */}
            <Grid.Row gutter={16} >
              <Grid.Col>
                <Card >
                  <Space size={48} align="center">
                    <Statistic title="Earnings" value={"$" + totalProfit.toFixed(2)} precision={2} style={{ minWidth: 100 }} />
                    <Statistic title="Date" value={date} style={{ minWidth: 100 }} />
                    <Statistic title="Time" value={time} style={{ minWidth: 100 }} />
                  </Space>
                  <Space size={48} align="center" style={{ marginLeft: '100px' }}>
                    <NextDayButton text={nextButtonText} onNext={handleNextButton} />
                  </Space>
                  
                </Card>
              </Grid.Col>
              
            </Grid.Row>

            {/* Chart */}
            <Card title="Real-Time Prices">
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
                  <Spin />
                </div>
              ) : rtm ? (
                <PriceChart data={rtm} />
              ) : (
                <Empty description="No data yet" />
              )}
            </Card>

            {/* Form */}
            <Card title="Enter Day-Ahead Market Bid">
              {time === '10:59 am' && (
                <div>
                  <BidForm onSubmit={handleBidSubmit} date={date} />
                </div>
              )}
            </Card>

            {/* Tables */}
            <Grid.Row gutter={16} style={{ alignItems: 'stretch' }}>
              <Grid.Col xs={24} lg={12} style={{ display: 'flex' }}>
                <Card title="Today's Contracts" style={{ flex: 1, height: '100%' }}>
                  <ConfirmedBidTable title="" data={confirmedBids} />
                </Card>
              </Grid.Col>
              <Grid.Col xs={24} lg={12} style={{ display: 'flex' }}>
                <Card title="Bids for Tomorrow" style={{ flex: 1, height: '100%' }}>
                  <BidTable title="" data={bids} />
                </Card>
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
