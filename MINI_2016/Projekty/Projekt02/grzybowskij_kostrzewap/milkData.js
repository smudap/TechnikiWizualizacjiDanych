var milkdata = {
    "2015": {},
    "2014": {},
    "2013": {},
    "2012": {},
    "2011": {},
    "2010": {},
    "2009": {},
    "2008": {},
    "2007": {},
    "2006": {},
    "2005": {},
    "2004": {}
}

function addData(item, i) {
    if (item.geo === "UK")
        milkdata[item.time]["GB"] = item.Mleko;
    else if (item.geo === "EL")
        milkdata[item.time]["GR"] = item.Mleko;
    else if (item.geo !== "TR")
        milkdata[item.time][item.geo] = item.Mleko;
}