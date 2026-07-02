export type CityProfile = {
  slug: string;
  name: string;
  province: string;
  population: string;
  climate: string;
  landmark: string;
  neighbourhood: string;
};

export const CITY_PROFILES: CityProfile[] = [
  {
    slug: "toronto",
    name: "Toronto",
    province: "ON",
    population: "2.9 million residents",
    climate: "humid continental winters and warm summers",
    landmark: "the CN Tower and Financial District high-rises",
    neighbourhood: "Liberty Village and the downtown core",
  },
  {
    slug: "ottawa",
    name: "Ottawa",
    province: "ON",
    population: "1 million in the wider metro area",
    climate: "cold winters with significant snowfall",
    landmark: "Parliament Hill and the Rideau Canal",
    neighbourhood: "Kanata and Centretown commercial corridors",
  },
  {
    slug: "burlington",
    name: "Burlington",
    province: "ON",
    population: "190,000 residents",
    climate: "lake-effect moderation along Lake Ontario",
    landmark: "Spencer Smith Park waterfront",
    neighbourhood: "Aldershot and downtown Burlington",
  },
  {
    slug: "oakville",
    name: "Oakville",
    province: "ON",
    population: "215,000 residents",
    climate: "milder winters near the lakeshore",
    landmark: "Bronte Harbour and Oakville Place",
    neighbourhood: "Uptown Core and Kerr Village",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    province: "ON",
    population: "720,000 residents",
    climate: "four-season weather with lake-influenced springs",
    landmark: "Square One and the Marilyn Monroe towers",
    neighbourhood: "City Centre and Meadowvale business parks",
  },
  {
    slug: "etobicoke",
    name: "Etobicoke",
    province: "ON",
    population: "365,000 residents",
    climate: "windy lakeshore conditions year-round",
    landmark: "Sherway Gardens and Humber Bay",
    neighbourhood: "The Kingsway and Islington Village",
  },
  {
    slug: "newmarket",
    name: "Newmarket",
    province: "ON",
    population: "93,000 residents",
    climate: "colder inland winters than lakeshore cities",
    landmark: "Main Street heritage district",
    neighbourhood: "Stonehaven and Upper Canada Mall area",
  },
  {
    slug: "calgary",
    name: "Calgary",
    province: "AB",
    population: "1.3 million residents",
    climate: "dry chinook-warmed winters and sunny summers",
    landmark: "the Calgary Tower and Bow River pathway",
    neighbourhood: "Beltline and Stephen Avenue offices",
  },
  {
    slug: "edmonton",
    name: "Edmonton",
    province: "AB",
    population: "1 million residents",
    climate: "long cold winters and short warm summers",
    landmark: "Rogers Place and the North Saskatchewan River valley",
    neighbourhood: "Ice District and Whyte Avenue",
  },
  {
    slug: "grande-prairie",
    name: "Grande Prairie",
    province: "AB",
    population: "68,000 residents",
    climate: "subarctic-influenced winters with heavy frost",
    landmark: "Eastlink Centre and Muskoseepi Park",
    neighbourhood: "Westgate and the downtown service corridor",
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    province: "BC",
    population: "2.6 million in the metro region",
    climate: "mild wet winters and dry summers",
    landmark: "Stanley Park and the Burrard Inlet waterfront",
    neighbourhood: "Yaletown and Mount Pleasant",
  },
  {
    slug: "burnaby",
    name: "Burnaby",
    province: "BC",
    population: "250,000 residents",
    climate: "rainy coastal winters with moderate temperatures",
    landmark: "Metropolis at Metrotown",
    neighbourhood: "Brentwood and Lougheed Town Centre",
  },
  {
    slug: "coquitlam",
    name: "Coquitlam",
    province: "BC",
    population: "150,000 residents",
    climate: "mountain-influenced rainfall and cool evenings",
    landmark: "Town Centre Park and Coquitlam Centre",
    neighbourhood: "Maillardville and Westwood Plateau",
  },
  {
    slug: "victoria",
    name: "Victoria",
    province: "BC",
    population: "400,000 in Greater Victoria",
    climate: "Canada's mildest winters with low snowfall",
    landmark: "the Inner Harbour and Legislature buildings",
    neighbourhood: "Downtown and the Uptown retail district",
  },
  {
    slug: "nanaimo",
    name: "Nanaimo",
    province: "BC",
    population: "100,000 residents",
    climate: "coastal marine climate with wet autumns",
    landmark: "the harbourfront and Newcastle Island views",
    neighbourhood: "Departure Bay and the Old City Quarter",
  },
  {
    slug: "kamloops",
    name: "Kamloops",
    province: "BC",
    population: "100,000 residents",
    climate: "semi-arid summers and cold dry winters",
    landmark: "Riverside Park along the Thompson River",
    neighbourhood: "Sahali and the North Shore industrial area",
  },
  {
    slug: "prince-george",
    name: "Prince George",
    province: "BC",
    population: "76,000 residents",
    climate: "long subarctic winters with deep snowpack",
    landmark: "CN Centre and the Nechako River cutbanks",
    neighbourhood: "Hart Highlands and downtown civic buildings",
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    province: "BC",
    population: "145,000 residents",
    climate: "heavy mountain rainfall and foggy shoulder seasons",
    landmark: "Lonsdale Quay and Grouse Mountain backdrop",
    neighbourhood: "Lower Lonsdale and Lynn Valley",
  },
  {
    slug: "fort-st-john",
    name: "Fort St. John",
    province: "BC",
    population: "21,000 residents",
    climate: "extreme northern winters dropping below -30°C",
    landmark: "the Alaska Highway mile-zero monument",
    neighbourhood: "the North Peace industrial corridor",
  },
  {
    slug: "montreal",
    name: "Montreal",
    province: "QC",
    population: "4.3 million in Greater Montreal",
    climate: "heavy snowfall winters and humid summers",
    landmark: "Mount Royal and Old Montreal",
    neighbourhood: "Griffintown and the Plateau commercial strips",
  },
  {
    slug: "laval",
    name: "Laval",
    province: "QC",
    population: "440,000 residents",
    climate: "continental winters with freeze-thaw cycles",
    landmark: "Centropolis and the Rivière des Prairies",
    neighbourhood: "Chomedey and Laval-des-Rapides",
  },
  {
    slug: "south-shore",
    name: "South Shore",
    province: "QC",
    population: "500,000 across Longueuil and surrounding towns",
    climate: "river-humidity winters along the St. Lawrence",
    landmark: "the Jacques-Cartier Bridge views toward Montreal",
    neighbourhood: "Longueuil and Brossard business parks",
  },
  {
    slug: "saskatoon",
    name: "Saskatoon",
    province: "SK",
    population: "317,000 residents",
    climate: "prairie winters with bitter wind chill",
    landmark: "the Broadway Bridge and South Saskatchewan River",
    neighbourhood: "Riversdale and Stonebridge",
  },
  {
    slug: "regina",
    name: "Regina",
    province: "SK",
    population: "249,000 residents",
    climate: "dry prairie climate with wide temperature swings",
    landmark: "Wascana Centre and the Legislative Building",
    neighbourhood: "Harbour Landing and the Warehouse District",
  },
  {
    slug: "winnipeg",
    name: "Winnipeg",
    province: "MB",
    population: "834,000 in the metro area",
    climate: "among Canada's coldest major-city winters",
    landmark: "The Forks and the Exchange District",
    neighbourhood: "St. Boniface and Polo Park retail hub",
  },
  {
    slug: "halifax",
    name: "Halifax",
    province: "NS",
    population: "480,000 in the regional municipality",
    climate: "foggy coastal winters and moderate summers",
    landmark: "the Halifax Citadel and waterfront boardwalk",
    neighbourhood: "Dartmouth and the Hydrostone district",
  },
];

const CITY_SLUG_SUFFIXES = [...CITY_PROFILES.map((c) => c.slug)].sort((a, b) => b.length - a.length);

export function getCityFromSlug(slug: string): CityProfile | null {
  const normalized = slug.replace(/^\//, "");
  for (const citySlug of CITY_SLUG_SUFFIXES) {
    if (normalized.endsWith(`-${citySlug}`)) {
      return CITY_PROFILES.find((c) => c.slug === citySlug) ?? null;
    }
  }
  return null;
}

export function getCityDisplayName(pageTargetArea: string): string {
  return pageTargetArea.replace(/,.*$/, "").trim();
}
