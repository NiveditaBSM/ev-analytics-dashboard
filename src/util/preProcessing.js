// headers in csv file: 
// VIN (1-10),County,City,State,Postal Code,Model Year,Make,Model,Electric Vehicle Type,
// Clean Alternative Fuel Vehicle (CAFV) Eligibility,Electric Range,Base MSRP,
// Legislative District,DOL Vehicle ID,Vehicle Location,Electric Utility,2020 Census Tract

export const parseCSVtoObj = (text) => {
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

export const getInsights = (data) => {
    console.log("Data passed to getInsights:", data);
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
        avgRange: 0
    };

    const msrpInsights = {
        maxMSRP: { msrp: 0, model: "", make: "" },
        minMSRP: { msrp: 0, model: "", make: "" },
        avgMSRP: 0
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

    const keyInsights = {
        freqBasedStats: {
            //County, City, Make, Model, Year
            countByCounty: Object.entries(countByCounty)
                .map(([county, count]) => ({ county, count }))
                .sort((a, b) => b.count - a.count),
            countByCity: Object.entries(countByCity)
                .map(([city, count]) => ({ city, count }))
                .sort((a, b) => b.count - a.count),
            countByMake: Object.entries(countByMake)
                .map(([make, count]) => ({ make, count }))
                .sort((a, b) => b.count - a.count),
            countByYear: Object.entries(countByYear)
                .map(([year, count]) => ({ year: parseInt(year), count }))
                .sort((a, b) => a.year - b.year),
            countByModel: Object.entries(countByModel)
                .map(([model, count]) => ({ model, count }))
                .sort((a, b) => b.count - a.count),
        },
        otherStats: {
            totalCount: data.length,
            uniqueMakes: Object.keys(countByMake).length,
            uniqueModels: Object.keys(countByModel).length,
            topMake: Object.entries(countByMake).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
            topCity: Object.entries(countByCity).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
            rangeInsights,
            msrpInsights,
            cafvEligiblePercent: ((cafvEligibilityCount / data.length) * 100).toFixed(1),
            bevShare: ((BEVCount / data.length) * 100).toFixed(1),
            phevShare: ((PHEVCount / data.length) * 100).toFixed(1),
        }
    };

    return keyInsights;

}