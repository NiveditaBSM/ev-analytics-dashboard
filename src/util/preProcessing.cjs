const fs = require('fs');
const csv = require('csv-parser');

const filePath = '../../data-to-visualize/Electric_Vehicle_Population_Data.csv';

const data = [];

// headers in csv file: 
// VIN (1-10),County,City,State,Postal Code,Model Year,Make,Model,Electric Vehicle Type,
// Clean Alternative Fuel Vehicle (CAFV) Eligibility,Electric Range,Base MSRP,
// Legislative District,DOL Vehicle ID,Vehicle Location,Electric Utility,2020 Census Tract

const parseCSVtoObj = (text) => {
    const lines = text.split("\n");
    const header = lines[0].split(",").map(title => title.trim());
    return lines
        .slice(1)
        .filter(line => line.trim())
        .map(line => {
            const values = line.split(",");
            return header.reduce((obj, title, index) => {
                obj[title] = values[index]?.trim() || "";
                return obj;
            }, {});
        });
}

const getData = async () => {
    console.log("CSV fetch started");

    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                data.push(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve(data)
            })
            .on('error', (error) => {
                console.log("Error reading the csv file", error);
                reject(error);
            })
    });

    return data;
}

const getInsights = (data) => {
    // console.log("Data passed to getInsights:", data);
    if (!Array.isArray(data)) {
        throw new Error("Data is not an array");
    }
    const countByCounty = {};
    const countByCity = {};
    const countByMake = {};
    const countByModel = {};
    const countByYear = {};

    const rangeInsights = {
        maxRange: { range: 0, model: "", make: "" },
        minRange: { range: 0, model: "", make: "" },
        validRangeCount: 0,
        totalRange: 0
    };

    const msrpInsights = {
        maxMSRP: { msrp: 0, model: "", make: "" },
        minMSRP: { msrp: 0, model: "", make: "" },
        validMSRPCount: 0,
        totalMSRP: 0
    }

    let cafvEligibilityCount = 0;
    let BEVCount = 0;
    let PHEVCount = 0;

    data.forEach(vehicle => {

        countByCounty[vehicle.County] = (countByCounty[vehicle.County] || 0) + 1;

        countByCity[vehicle.City] = (countByCity[vehicle.City] || 0) + 1;

        const year = parseInt(vehicle["Model Year"]);
        if (year) {
            countByYear[year] = (countByYear[year] || 0) + 1;
        }

        countByMake[vehicle.Make] = (countByMake[vehicle.Make] || 0) + 1;

        const makeModel = `${vehicle.Make} ${vehicle.Model}`;
        countByModel[makeModel] = (countByModel[makeModel] || 0) + 1;

        if (vehicle["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)") BEVCount++;
        if (vehicle["Electric Vehicle Type"] === "Plug-in Hybrid Electric Vehicle (PHEV)") PHEVCount++;

        if (vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] === "Clean Alternative Fuel Vehicle Eligible") cafvEligibilityCount++;

        const range = parseFloat(vehicle["Electric Range"]);
        if (range > 0) {
            rangeInsights.validRangeCount += 1;
            rangeInsights.totalRange += range;
            if (rangeInsights.minRange.range > range) {
                rangeInsights.minRange.range = range;
                rangeInsights.minRange.make = vehicle.Make;
                rangeInsights.minRange.model = vehicle.Model;
            }
            if (rangeInsights.maxRange.range < range) {
                rangeInsights.maxRange.range = range;
                rangeInsights.maxRange.make = vehicle.Make;
                rangeInsights.maxRange.model = vehicle.Model;
            }
        }

        const msrp = Number(vehicle["Base MSRP"]);
        if (msrp > 0) {
            msrpInsights.validMSRPCount += 1;
            msrpInsights.totalMSRP += msrp;
            if (msrpInsights.minMSRP.msrp > msrp) {
                msrpInsights.minMSRP.msrp = msrp;
                msrpInsights.minMSRP.make = vehicle.Make;
                msrpInsights.minMSRP.model = vehicle.Model;
            }
            if (msrpInsights.maxMSRP.msrp < msrp) {
                msrpInsights.maxMSRP.msrp = msrp;
                msrpInsights.maxMSRP.make = vehicle.Make;
                msrpInsights.maxMSRP.model = vehicle.Model
            }
        }

    });

    rangeInsights.avgRange = (rangeInsights.totalRange / rangeInsights.validRangeCount).toFixed(1);
    msrpInsights.avgMSRP = (msrpInsights.totalMSRP / msrpInsights.validMSRPCount).toFixed(1);

    const keyInsights = {
        totalPopulation: data.length,
        //County, City, Make, Model, Year
        populationByCounty: Object.entries(countByCounty)
            .map(([county, count]) => ({ county, count }))
            .sort((a, b) => b.count - a.count),
        populationByCity: Object.entries(countByCity)
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => b.count - a.count),
        populationByMake: Object.entries(countByMake)
            .map(([make, count]) => ({ make, count }))
            .sort((a, b) => b.count - a.count),
        populationByYear: Object.entries(countByYear)
            .map(([year, count]) => ({ year: parseInt(year), count }))
            .sort((a, b) => a.year - b.year),
        populationByModel: Object.entries(countByModel)
            .map(([model, count]) => ({ model, count }))
            .sort((a, b) => b.count - a.count),

    }
    console.log("Key Insights: ", keyInsights);

    let sortedModel = keyInsights.populationByModel;
    //console.log("Population by make: ", keyInsights.populationByMake[0].make);
    let topMake = keyInsights.populationByMake[0]?.make || 'N/A';
    let topModelOfTopMake;

    for (let model of sortedModel) {
        if (model.model.startsWith(topMake)) {
            topModelOfTopMake = model.model;
            break;
        }
    }

    const makeStats = keyInsights.populationByMake;
    const distributionByMake = { 'Others': 0 };
    makeStats.forEach((item, i) => {
        if (i < 5) distributionByMake[item.make] = item.count;
        else distributionByMake['Others'] += item.count;
    })

    const overviewInsights = {
        topBrand: {
            name: topMake,
            model: topModelOfTopMake
        },
        topCity: {
            name: keyInsights.populationByCity[0]?.city || 'N/A',
            share: ((keyInsights.populationByCity[0]?.count / keyInsights.totalPopulation) * 100).toFixed(1),
        },
        topCounty: {
            name: keyInsights.populationByCounty[0]?.county || 'N/A',
            share: ((keyInsights.populationByCounty[0]?.count / keyInsights.totalPopulation) * 100).toFixed(1),
        },
        rangeInsights,
        msrpInsights,
        cafvEligiblePercent: ((cafvEligibilityCount / keyInsights.totalPopulation) * 100).toFixed(1),
        bevShare: ((BEVCount / keyInsights.totalPopulation) * 100).toFixed(1),
        phevShare: ((PHEVCount / keyInsights.totalPopulation) * 100).toFixed(1),
        distributionByMake

    }

    console.log("Overview insights: ", overviewInsights);

    return { keyInsights, overviewInsights };
}


const processing = async () => {
    const data = await getData();
    const insights = await getInsights(data);
    return insights;
}


processing().then(data => {
    console.log("Output data after processing: ", data);
});

