export async function getRealTimeData(date: string): Promise<number[]> {

    try {
        //fetch data through FastAPI
        const response = await fetch(`http://127.0.0.1:8000/realtime/${date}`);

        //throw error if issue with response
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        //extract data from response
        const data = await response.json();
        return data;

    } catch(error) {
        console.log("Could not load Real Time Data.");
        return [];
    }

}

export async function getDayAheadData(date: string): Promise<number[]> {

    try {
        //fetch data through FastAPI
        const response = await fetch(`http://127.0.0.1:8000/dayahead/${date}`);

        //throw error if issue with response
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        //extract data from response
        const data = await response.json();
        return data;

    } catch(error) {
        console.log("Could not load Day Ahead Data.");
        return [];
    }

}