export interface Microseason {
  id: number;
  nameJa: string;
  nameEn: string;
  description: string;
  startDate: { month: number; day: number };
  endDate: { month: number; day: number };
  solarTerm: string;
  imagery: string[];
  colors: string[];
}

export const microseasons: Microseason[] = [
  // Spring (立春 Risshun - Beginning of Spring)
  {
    id: 1,
    nameJa: "東風解凍",
    nameEn: "East wind melts the ice",
    description: "The east wind begins to thaw the frozen winter landscape",
    startDate: { month: 2, day: 4 },
    endDate: { month: 2, day: 8 },
    solarTerm: "Risshun",
    imagery: ["wind", "ice", "thaw"],
    colors: ["#E8F4F8", "#B8D4E0", "#7BA5B8"]
  },
  {
    id: 2,
    nameJa: "黄鶯睍睆",
    nameEn: "Bush warblers start singing in the mountains",
    description: "The Japanese bush warbler begins its distinctive song",
    startDate: { month: 2, day: 9 },
    endDate: { month: 2, day: 13 },
    solarTerm: "Risshun",
    imagery: ["birds", "mountains", "song"],
    colors: ["#D4E8D4", "#A8C0A8", "#7C987C"]
  },
  {
    id: 3,
    nameJa: "魚上氷",
    nameEn: "Fish emerge from the ice",
    description: "Fish become active beneath the melting ice",
    startDate: { month: 2, day: 14 },
    endDate: { month: 2, day: 18 },
    solarTerm: "Risshun",
    imagery: ["fish", "ice", "water"],
    colors: ["#C8E0F0", "#90B8D8", "#5890C0"]
  },
  // 雨水 Usui - Rainwater
  {
    id: 4,
    nameJa: "土脉潤起",
    nameEn: "Rain moistens the soil",
    description: "Spring rains begin to soften the frozen earth",
    startDate: { month: 2, day: 19 },
    endDate: { month: 2, day: 23 },
    solarTerm: "Usui",
    imagery: ["rain", "soil", "moisture"],
    colors: ["#8B7355", "#A89080", "#C4B0A0"]
  },
  {
    id: 5,
    nameJa: "霞始靆",
    nameEn: "Mist starts to linger",
    description: "Spring mist begins to appear in the valleys",
    startDate: { month: 2, day: 24 },
    endDate: { month: 2, day: 28 },
    solarTerm: "Usui",
    imagery: ["mist", "valleys", "atmosphere"],
    colors: ["#E0E8F0", "#C0D0E0", "#A0B8D0"]
  },
  {
    id: 6,
    nameJa: "草木萌動",
    nameEn: "Grass sprouts, trees bud",
    description: "The first green shoots push through the warming soil",
    startDate: { month: 3, day: 1 },
    endDate: { month: 3, day: 5 },
    solarTerm: "Usui",
    imagery: ["sprouts", "buds", "growth"],
    colors: ["#90C878", "#A8D890", "#C0E8A8"]
  },
  // 啓蟄 Keichitsu - Awakening of Insects
  {
    id: 7,
    nameJa: "蟄虫啓戸",
    nameEn: "Hibernating insects surface",
    description: "Insects emerge from winter hibernation",
    startDate: { month: 3, day: 6 },
    endDate: { month: 3, day: 10 },
    solarTerm: "Keichitsu",
    imagery: ["insects", "emergence", "awakening"],
    colors: ["#C8B090", "#D8C8A8", "#E8D8C0"]
  },
  {
    id: 8,
    nameJa: "桃始笑",
    nameEn: "First peach blossoms",
    description: "Peach flowers begin to bloom",
    startDate: { month: 3, day: 11 },
    endDate: { month: 3, day: 15 },
    solarTerm: "Keichitsu",
    imagery: ["peach", "blossoms", "pink"],
    colors: ["#FFB8C8", "#FFC8D8", "#FFD8E8"]
  },
  {
    id: 9,
    nameJa: "菜虫化蝶",
    nameEn: "Caterpillars become butterflies",
    description: "Caterpillars transform into butterflies",
    startDate: { month: 3, day: 16 },
    endDate: { month: 3, day: 20 },
    solarTerm: "Keichitsu",
    imagery: ["butterflies", "transformation", "flight"],
    colors: ["#F8E8A8", "#F0D890", "#E8C878"]
  },
  // 春分 Shunbun - Spring Equinox
  {
    id: 10,
    nameJa: "雀始巣",
    nameEn: "Sparrows start to nest",
    description: "Sparrows begin building their nests",
    startDate: { month: 3, day: 21 },
    endDate: { month: 3, day: 25 },
    solarTerm: "Shunbun",
    imagery: ["sparrows", "nests", "home"],
    colors: ["#D8C0A0", "#C8B090", "#B8A080"]
  },
  {
    id: 11,
    nameJa: "桜始開",
    nameEn: "First cherry blossoms",
    description: "The first cherry blossoms open",
    startDate: { month: 3, day: 26 },
    endDate: { month: 3, day: 30 },
    solarTerm: "Shunbun",
    imagery: ["sakura", "blossoms", "celebration"],
    colors: ["#FFD8E8", "#FFC8D8", "#FFB8C8"]
  },
  {
    id: 12,
    nameJa: "雷乃発声",
    nameEn: "Distant thunder",
    description: "The first spring thunder is heard",
    startDate: { month: 3, day: 31 },
    endDate: { month: 4, day: 4 },
    solarTerm: "Shunbun",
    imagery: ["thunder", "storm", "energy"],
    colors: ["#9090C8", "#A8A8D8", "#C0C0E8"]
  },
  // 清明 Seimei - Pure and Clear
  {
    id: 13,
    nameJa: "玄鳥至",
    nameEn: "Swallows return",
    description: "Swallows return from their southern migration",
    startDate: { month: 4, day: 5 },
    endDate: { month: 4, day: 9 },
    solarTerm: "Seimei",
    imagery: ["swallows", "migration", "return"],
    colors: ["#6090C0", "#7898C8", "#90A8D0"]
  },
  {
    id: 14,
    nameJa: "鴻雁北",
    nameEn: "Wild geese fly north",
    description: "Wild geese begin their northern migration",
    startDate: { month: 4, day: 10 },
    endDate: { month: 4, day: 14 },
    solarTerm: "Seimei",
    imagery: ["geese", "north", "journey"],
    colors: ["#A8C8E0", "#B8D0E8", "#C8D8F0"]
  },
  {
    id: 15,
    nameJa: "虹始見",
    nameEn: "First rainbows",
    description: "Rainbows begin to appear after spring showers",
    startDate: { month: 4, day: 15 },
    endDate: { month: 4, day: 19 },
    solarTerm: "Seimei",
    imagery: ["rainbow", "rain", "light"],
    colors: ["#C8A8E0", "#D8B8E8", "#E8C8F0"]
  },
  // 穀雨 Kokuu - Grain Rain
  {
    id: 16,
    nameJa: "葭始生",
    nameEn: "Reeds sprout",
    description: "Reeds begin to grow along the water's edge",
    startDate: { month: 4, day: 20 },
    endDate: { month: 4, day: 24 },
    solarTerm: "Kokuu",
    imagery: ["reeds", "water", "growth"],
    colors: ["#A8C890", "#B8D8A0", "#C8E8B0"]
  },
  {
    id: 17,
    nameJa: "霜止出苗",
    nameEn: "Last frost, rice seedlings grow",
    description: "The last frost ends and rice seedlings flourish",
    startDate: { month: 4, day: 25 },
    endDate: { month: 4, day: 29 },
    solarTerm: "Kokuu",
    imagery: ["rice", "seedlings", "growth"],
    colors: ["#98D878", "#A8E088", "#B8E898"]
  },
  {
    id: 18,
    nameJa: "牡丹華",
    nameEn: "Peonies bloom",
    description: "Luxurious peony flowers open",
    startDate: { month: 4, day: 30 },
    endDate: { month: 5, day: 4 },
    solarTerm: "Kokuu",
    imagery: ["peonies", "luxury", "bloom"],
    colors: ["#F8A8C8", "#FFB8D8", "#FFC8E8"]
  },
  // Summer (立夏 Rikka - Beginning of Summer)
  {
    id: 19,
    nameJa: "蛙始鳴",
    nameEn: "Frogs start singing",
    description: "Frogs begin their evening chorus",
    startDate: { month: 5, day: 5 },
    endDate: { month: 5, day: 9 },
    solarTerm: "Rikka",
    imagery: ["frogs", "singing", "evening"],
    colors: ["#78C898", "#88D0A8", "#98D8B8"]
  },
  {
    id: 20,
    nameJa: "蚯蚓出",
    nameEn: "Worms surface",
    description: "Earthworms emerge from the soil",
    startDate: { month: 5, day: 10 },
    endDate: { month: 5, day: 14 },
    solarTerm: "Rikka",
    imagery: ["earthworms", "soil", "cycle"],
    colors: ["#906850", "#A07860", "#B08870"]
  },
  {
    id: 21,
    nameJa: "竹笋生",
    nameEn: "Bamboo shoots sprout",
    description: "Fresh bamboo shoots push through the ground",
    startDate: { month: 5, day: 15 },
    endDate: { month: 5, day: 20 },
    solarTerm: "Rikka",
    imagery: ["bamboo", "shoots", "vigor"],
    colors: ["#88B878", "#98C088", "#A8C898"]
  },
  // 小満 Shōman - Lesser Ripening
  {
    id: 22,
    nameJa: "蚕起食桑",
    nameEn: "Silkworms start feasting on mulberry leaves",
    description: "Silkworms emerge and begin eating mulberry leaves",
    startDate: { month: 5, day: 21 },
    endDate: { month: 5, day: 25 },
    solarTerm: "Shōman",
    imagery: ["silkworms", "mulberry", "silk"],
    colors: ["#E8E8D8", "#F0F0E0", "#F8F8E8"]
  },
  {
    id: 23,
    nameJa: "紅花栄",
    nameEn: "Safflowers bloom",
    description: "Brilliant safflower blossoms appear",
    startDate: { month: 5, day: 26 },
    endDate: { month: 5, day: 30 },
    solarTerm: "Shōman",
    imagery: ["safflower", "red", "bloom"],
    colors: ["#E88878", "#F09888", "#F8A898"]
  },
  {
    id: 24,
    nameJa: "麦秋至",
    nameEn: "Wheat ripens and is harvested",
    description: "Wheat fields turn golden and are ready for harvest",
    startDate: { month: 5, day: 31 },
    endDate: { month: 6, day: 5 },
    solarTerm: "Shōman",
    imagery: ["wheat", "harvest", "gold"],
    colors: ["#E8C878", "#F0D088", "#F8D898"]
  },
  // 芒種 Bōshu - Grain in Ear
  {
    id: 25,
    nameJa: "螳螂生",
    nameEn: "Praying mantises hatch",
    description: "Young praying mantises emerge from their eggs",
    startDate: { month: 6, day: 6 },
    endDate: { month: 6, day: 10 },
    solarTerm: "Bōshu",
    imagery: ["mantis", "birth", "green"],
    colors: ["#88C878", "#98D088", "#A8D898"]
  },
  {
    id: 26,
    nameJa: "腐草為螢",
    nameEn: "Rotten grass becomes fireflies",
    description: "Fireflies emerge, believed to be born from decaying grass",
    startDate: { month: 6, day: 11 },
    endDate: { month: 6, day: 15 },
    solarTerm: "Bōshu",
    imagery: ["fireflies", "light", "magic"],
    colors: ["#F8E888", "#FFF098", "#FFF8A8"]
  },
  {
    id: 27,
    nameJa: "梅子黄",
    nameEn: "Plums turn yellow",
    description: "Plums ripen to a golden yellow",
    startDate: { month: 6, day: 16 },
    endDate: { month: 6, day: 20 },
    solarTerm: "Bōshu",
    imagery: ["plums", "yellow", "ripening"],
    colors: ["#E8D868", "#F0E078", "#F8E888"]
  },
  // 夏至 Geshi - Summer Solstice
  {
    id: 28,
    nameJa: "乃東枯",
    nameEn: "Self-heal withers",
    description: "The self-heal plant dries and withers",
    startDate: { month: 6, day: 21 },
    endDate: { month: 6, day: 26 },
    solarTerm: "Geshi",
    imagery: ["withering", "summer", "cycle"],
    colors: ["#C8A878", "#D0B088", "#D8B898"]
  },
  {
    id: 29,
    nameJa: "菖蒲華",
    nameEn: "Irises bloom",
    description: "Elegant iris flowers open",
    startDate: { month: 6, day: 27 },
    endDate: { month: 7, day: 1 },
    solarTerm: "Geshi",
    imagery: ["iris", "purple", "elegance"],
    colors: ["#8878C8", "#9888D0", "#A898D8"]
  },
  {
    id: 30,
    nameJa: "半夏生",
    nameEn: "Crow-dipper sprouts",
    description: "Half-summer plants begin to grow",
    startDate: { month: 7, day: 2 },
    endDate: { month: 7, day: 6 },
    solarTerm: "Geshi",
    imagery: ["plants", "growth", "half-summer"],
    colors: ["#A8C8A8", "#B8D0B8", "#C8D8C8"]
  },
  // 小暑 Shōsho - Lesser Heat
  {
    id: 31,
    nameJa: "温風至",
    nameEn: "Warm winds blow",
    description: "Warm summer winds begin to blow",
    startDate: { month: 7, day: 7 },
    endDate: { month: 7, day: 11 },
    solarTerm: "Shōsho",
    imagery: ["wind", "warmth", "summer"],
    colors: ["#F8C878", "#FFD088", "#FFD898"]
  },
  {
    id: 32,
    nameJa: "蓮始開",
    nameEn: "First lotus blossoms",
    description: "Lotus flowers begin to bloom",
    startDate: { month: 7, day: 12 },
    endDate: { month: 7, day: 17 },
    solarTerm: "Shōsho",
    imagery: ["lotus", "purity", "bloom"],
    colors: ["#F8A8B8", "#FFB8C8", "#FFC8D8"]
  },
  {
    id: 33,
    nameJa: "鷹乃学習",
    nameEn: "Hawks learn to fly",
    description: "Young hawks practice flying",
    startDate: { month: 7, day: 18 },
    endDate: { month: 7, day: 22 },
    solarTerm: "Shōsho",
    imagery: ["hawks", "flight", "learning"],
    colors: ["#9890A8", "#A8A0B0", "#B8B0B8"]
  },
  // 大暑 Taisho - Greater Heat
  {
    id: 34,
    nameJa: "桐始結花",
    nameEn: "Paulownia trees produce seeds",
    description: "Paulownia trees bear their seeds",
    startDate: { month: 7, day: 23 },
    endDate: { month: 7, day: 28 },
    solarTerm: "Taisho",
    imagery: ["paulownia", "seeds", "future"],
    colors: ["#C8B098", "#D0B8A0", "#D8C0A8"]
  },
  {
    id: 35,
    nameJa: "土潤溽暑",
    nameEn: "Earth is damp, air is humid",
    description: "The soil is moist and the air heavy with humidity",
    startDate: { month: 7, day: 29 },
    endDate: { month: 8, day: 2 },
    solarTerm: "Taisho",
    imagery: ["humidity", "earth", "summer"],
    colors: ["#A09088", "#A89890", "#B0A098"]
  },
  {
    id: 36,
    nameJa: "大雨時行",
    nameEn: "Great rains sometimes fall",
    description: "Heavy summer rains occasionally pour down",
    startDate: { month: 8, day: 3 },
    endDate: { month: 8, day: 7 },
    solarTerm: "Taisho",
    imagery: ["rain", "torrent", "cleansing"],
    colors: ["#7898B8", "#88A0C0", "#98A8C8"]
  },
  // Autumn (立秋 Risshū - Beginning of Autumn)
  {
    id: 37,
    nameJa: "涼風至",
    nameEn: "Cool winds blow",
    description: "The first cool autumn winds arrive",
    startDate: { month: 8, day: 8 },
    endDate: { month: 8, day: 12 },
    solarTerm: "Risshū",
    imagery: ["wind", "coolness", "change"],
    colors: ["#A8C8D8", "#B0D0E0", "#B8D8E8"]
  },
  {
    id: 38,
    nameJa: "寒蝉鳴",
    nameEn: "Evening cicadas sing",
    description: "Cicadas sing their late summer song",
    startDate: { month: 8, day: 13 },
    endDate: { month: 8, day: 17 },
    solarTerm: "Risshū",
    imagery: ["cicadas", "song", "evening"],
    colors: ["#88A878", "#90B080", "#98B888"]
  },
  {
    id: 39,
    nameJa: "蒙霧升降",
    nameEn: "Thick fog descends",
    description: "Dense morning mists begin to form",
    startDate: { month: 8, day: 18 },
    endDate: { month: 8, day: 22 },
    solarTerm: "Risshū",
    imagery: ["fog", "mist", "mystery"],
    colors: ["#D8E0E8", "#E0E8F0", "#E8F0F8"]
  },
  // 処暑 Shosho - Manageable Heat
  {
    id: 40,
    nameJa: "綿柎開",
    nameEn: "Cotton flowers bloom",
    description: "Cotton plants bloom with white flowers",
    startDate: { month: 8, day: 23 },
    endDate: { month: 8, day: 27 },
    solarTerm: "Shosho",
    imagery: ["cotton", "white", "softness"],
    colors: ["#F8F8F0", "#FFFFF8", "#FFFFFF"]
  },
  {
    id: 41,
    nameJa: "天地始粛",
    nameEn: "Heat begins to die down",
    description: "The intense heat of summer starts to subside",
    startDate: { month: 8, day: 28 },
    endDate: { month: 9, day: 1 },
    solarTerm: "Shosho",
    imagery: ["cooling", "relief", "transition"],
    colors: ["#C8D0D8", "#D0D8E0", "#D8E0E8"]
  },
  {
    id: 42,
    nameJa: "禾乃登",
    nameEn: "Rice ripens",
    description: "Rice plants ripen to a golden hue",
    startDate: { month: 9, day: 2 },
    endDate: { month: 9, day: 7 },
    solarTerm: "Shosho",
    imagery: ["rice", "harvest", "abundance"],
    colors: ["#E8C868", "#F0D078", "#F8D888"]
  },
  // 白露 Hakuro - White Dew
  {
    id: 43,
    nameJa: "草露白",
    nameEn: "Dew glistens white on grass",
    description: "Morning dew appears white on the grass",
    startDate: { month: 9, day: 8 },
    endDate: { month: 9, day: 12 },
    solarTerm: "Hakuro",
    imagery: ["dew", "morning", "white"],
    colors: ["#E8F0F8", "#F0F8FF", "#F8FFFF"]
  },
  {
    id: 44,
    nameJa: "鶺鴒鳴",
    nameEn: "Wagtails sing",
    description: "Wagtails begin their autumn song",
    startDate: { month: 9, day: 13 },
    endDate: { month: 9, day: 17 },
    solarTerm: "Hakuro",
    imagery: ["wagtails", "birds", "song"],
    colors: ["#D8D0C8", "#E0D8D0", "#E8E0D8"]
  },
  {
    id: 45,
    nameJa: "玄鳥去",
    nameEn: "Swallows leave",
    description: "Swallows begin their southern migration",
    startDate: { month: 9, day: 18 },
    endDate: { month: 9, day: 22 },
    solarTerm: "Hakuro",
    imagery: ["swallows", "departure", "journey"],
    colors: ["#8890A8", "#9098B0", "#98A0B8"]
  },
  // 秋分 Shūbun - Autumn Equinox
  {
    id: 46,
    nameJa: "雷乃収声",
    nameEn: "Thunder ceases",
    description: "Thunder is no longer heard",
    startDate: { month: 9, day: 23 },
    endDate: { month: 9, day: 27 },
    solarTerm: "Shūbun",
    imagery: ["silence", "calm", "peace"],
    colors: ["#B8B8C8", "#C0C0D0", "#C8C8D8"]
  },
  {
    id: 47,
    nameJa: "蟄虫坏戸",
    nameEn: "Insects hole up underground",
    description: "Insects begin preparing for winter hibernation",
    startDate: { month: 9, day: 28 },
    endDate: { month: 10, day: 2 },
    solarTerm: "Shūbun",
    imagery: ["insects", "underground", "preparation"],
    colors: ["#987858", "#A08060", "#A88868"]
  },
  {
    id: 48,
    nameJa: "水始涸",
    nameEn: "Farmers drain fields",
    description: "Rice fields are drained for harvest",
    startDate: { month: 10, day: 3 },
    endDate: { month: 10, day: 7 },
    solarTerm: "Shūbun",
    imagery: ["fields", "harvest", "water"],
    colors: ["#A89878", "#B0A080", "#B8A888"]
  },
  // 寒露 Kanro - Cold Dew
  {
    id: 49,
    nameJa: "鴻雁来",
    nameEn: "Wild geese return",
    description: "Wild geese return from the north",
    startDate: { month: 10, day: 8 },
    endDate: { month: 10, day: 12 },
    solarTerm: "Kanro",
    imagery: ["geese", "return", "migration"],
    colors: ["#A8B8C8", "#B0C0D0", "#B8C8D8"]
  },
  {
    id: 50,
    nameJa: "菊花開",
    nameEn: "Chrysanthemums bloom",
    description: "Chrysanthemum flowers open",
    startDate: { month: 10, day: 13 },
    endDate: { month: 10, day: 17 },
    solarTerm: "Kanro",
    imagery: ["chrysanthemum", "autumn", "elegance"],
    colors: ["#E8B878", "#F0C088", "#F8C898"]
  },
  {
    id: 51,
    nameJa: "蟋蟀在戸",
    nameEn: "Crickets chirp around the door",
    description: "Crickets sing near houses",
    startDate: { month: 10, day: 18 },
    endDate: { month: 10, day: 22 },
    solarTerm: "Kanro",
    imagery: ["crickets", "home", "evening"],
    colors: ["#786858", "#807060", "#887868"]
  },
  // 霜降 Sōkō - Frost Falls
  {
    id: 52,
    nameJa: "霜始降",
    nameEn: "First frost",
    description: "The first frost of autumn appears",
    startDate: { month: 10, day: 23 },
    endDate: { month: 10, day: 27 },
    solarTerm: "Sōkō",
    imagery: ["frost", "cold", "crystalline"],
    colors: ["#E0E8F0", "#E8F0F8", "#F0F8FF"]
  },
  {
    id: 53,
    nameJa: "霎時施",
    nameEn: "Light rains sometimes fall",
    description: "Light autumn drizzle occasionally falls",
    startDate: { month: 10, day: 28 },
    endDate: { month: 11, day: 1 },
    solarTerm: "Sōkō",
    imagery: ["drizzle", "autumn", "gentle"],
    colors: ["#B8C0C8", "#C0C8D0", "#C8D0D8"]
  },
  {
    id: 54,
    nameJa: "楓蔦黄",
    nameEn: "Maple leaves and ivy turn yellow",
    description: "Autumn leaves turn brilliant colors",
    startDate: { month: 11, day: 2 },
    endDate: { month: 11, day: 6 },
    solarTerm: "Sōkō",
    imagery: ["maple", "yellow", "transformation"],
    colors: ["#E8A858", "#F0B068", "#F8B878"]
  },
  // Winter (立冬 Rittō - Beginning of Winter)
  {
    id: 55,
    nameJa: "山茶始開",
    nameEn: "Camellias bloom",
    description: "Camellia flowers begin to open",
    startDate: { month: 11, day: 7 },
    endDate: { month: 11, day: 11 },
    solarTerm: "Rittō",
    imagery: ["camellia", "red", "winter bloom"],
    colors: ["#D84860", "#E05868", "#E86870"]
  },
  {
    id: 56,
    nameJa: "地始凍",
    nameEn: "Earth begins to freeze",
    description: "The ground starts to freeze",
    startDate: { month: 11, day: 12 },
    endDate: { month: 11, day: 16 },
    solarTerm: "Rittō",
    imagery: ["freezing", "earth", "cold"],
    colors: ["#B8C0C8", "#C0C8D0", "#C8D0D8"]
  },
  {
    id: 57,
    nameJa: "金盞香",
    nameEn: "Daffodils bloom",
    description: "Daffodils begin to flower",
    startDate: { month: 11, day: 17 },
    endDate: { month: 11, day: 21 },
    solarTerm: "Rittō",
    imagery: ["daffodils", "yellow", "hope"],
    colors: ["#F8D858", "#FFE068", "#FFE878"]
  },
  // 小雪 Shōsetsu - Lesser Snow
  {
    id: 58,
    nameJa: "虹蔵不見",
    nameEn: "Rainbows hide",
    description: "Rainbows are no longer seen",
    startDate: { month: 11, day: 22 },
    endDate: { month: 11, day: 26 },
    solarTerm: "Shōsetsu",
    imagery: ["absence", "gray", "winter"],
    colors: ["#C8C8C8", "#D0D0D0", "#D8D8D8"]
  },
  {
    id: 59,
    nameJa: "朔風払葉",
    nameEn: "North wind blows the leaves from the trees",
    description: "Cold north winds strip trees of their leaves",
    startDate: { month: 11, day: 27 },
    endDate: { month: 12, day: 1 },
    solarTerm: "Shōsetsu",
    imagery: ["wind", "bare trees", "north"],
    colors: ["#98A0A8", "#A0A8B0", "#A8B0B8"]
  },
  {
    id: 60,
    nameJa: "橘始黄",
    nameEn: "Tachibana citrus tree leaves turn yellow",
    description: "Citrus fruits ripen to orange",
    startDate: { month: 12, day: 2 },
    endDate: { month: 12, day: 6 },
    solarTerm: "Shōsetsu",
    imagery: ["citrus", "orange", "warmth"],
    colors: ["#F8A848", "#FFB058", "#FFB868"]
  },
  // 大雪 Taisetsu - Greater Snow
  {
    id: 61,
    nameJa: "閉塞成冬",
    nameEn: "Cold sets in, winter begins",
    description: "The full cold of winter arrives",
    startDate: { month: 12, day: 7 },
    endDate: { month: 12, day: 11 },
    solarTerm: "Taisetsu",
    imagery: ["cold", "winter", "stillness"],
    colors: ["#D8E0E8", "#E0E8F0", "#E8F0F8"]
  },
  {
    id: 62,
    nameJa: "熊蟄穴",
    nameEn: "Bears hibernate in their dens",
    description: "Bears enter their winter dens",
    startDate: { month: 12, day: 12 },
    endDate: { month: 12, day: 16 },
    solarTerm: "Taisetsu",
    imagery: ["bears", "hibernation", "sleep"],
    colors: ["#887860", "#908068", "#988870"]
  },
  {
    id: 63,
    nameJa: "鱖魚群",
    nameEn: "Salmons gather and swim upstream",
    description: "Salmon gather in large groups",
    startDate: { month: 12, day: 17 },
    endDate: { month: 12, day: 21 },
    solarTerm: "Taisetsu",
    imagery: ["salmon", "river", "journey"],
    colors: ["#E8A8A8", "#F0B0B0", "#F8B8B8"]
  },
  // 冬至 Tōji - Winter Solstice
  {
    id: 64,
    nameJa: "乃東生",
    nameEn: "Self-heal sprouts",
    description: "Self-heal plants begin to sprout",
    startDate: { month: 12, day: 22 },
    endDate: { month: 12, day: 26 },
    solarTerm: "Tōji",
    imagery: ["sprouts", "life", "hope"],
    colors: ["#A8C8A8", "#B0D0B0", "#B8D8B8"]
  },
  {
    id: 65,
    nameJa: "麋角解",
    nameEn: "Deer shed antlers",
    description: "Deer naturally shed their antlers",
    startDate: { month: 12, day: 27 },
    endDate: { month: 12, day: 31 },
    solarTerm: "Tōji",
    imagery: ["deer", "antlers", "renewal"],
    colors: ["#C8B098", "#D0B8A0", "#D8C0A8"]
  },
  {
    id: 66,
    nameJa: "雪下出麦",
    nameEn: "Wheat sprouts under snow",
    description: "New wheat sprouts emerge beneath the snow",
    startDate: { month: 1, day: 1 },
    endDate: { month: 1, day: 4 },
    solarTerm: "Tōji",
    imagery: ["wheat", "snow", "resilience"],
    colors: ["#E8F0E8", "#F0F8F0", "#F8FFF8"]
  },
  // 小寒 Shōkan - Lesser Cold
  {
    id: 67,
    nameJa: "芹乃栄",
    nameEn: "Parsley flourishes",
    description: "Water parsley thrives in the cold",
    startDate: { month: 1, day: 5 },
    endDate: { month: 1, day: 9 },
    solarTerm: "Shōkan",
    imagery: ["parsley", "green", "vitality"],
    colors: ["#88B888", "#90C090", "#98C898"]
  },
  {
    id: 68,
    nameJa: "水泉動",
    nameEn: "Springs thaw",
    description: "Spring water begins to move beneath the ice",
    startDate: { month: 1, day: 10 },
    endDate: { month: 1, day: 14 },
    solarTerm: "Shōkan",
    imagery: ["water", "movement", "thaw"],
    colors: ["#A8D8E8", "#B0E0F0", "#B8E8F8"]
  },
  {
    id: 69,
    nameJa: "雉始雊",
    nameEn: "Pheasants start to call",
    description: "Pheasants begin their mating call",
    startDate: { month: 1, day: 15 },
    endDate: { month: 1, day: 19 },
    solarTerm: "Shōkan",
    imagery: ["pheasants", "call", "courtship"],
    colors: ["#C89878", "#D0A080", "#D8A888"]
  },
  // 大寒 Daikan - Greater Cold
  {
    id: 70,
    nameJa: "款冬華",
    nameEn: "Butterburs bud",
    description: "Butterbur buds appear through the snow",
    startDate: { month: 1, day: 20 },
    endDate: { month: 1, day: 24 },
    solarTerm: "Daikan",
    imagery: ["butterbur", "buds", "promise"],
    colors: ["#E8D8C8", "#F0E0D0", "#F8E8D8"]
  },
  {
    id: 71,
    nameJa: "水沢腹堅",
    nameEn: "Ice thickens on streams",
    description: "Ice becomes thickest on rivers and ponds",
    startDate: { month: 1, day: 25 },
    endDate: { month: 1, day: 29 },
    solarTerm: "Daikan",
    imagery: ["ice", "thickness", "depth"],
    colors: ["#D8E8F8", "#E0F0FF", "#E8F8FF"]
  },
  {
    id: 72,
    nameJa: "鶏始乳",
    nameEn: "Hens start laying eggs",
    description: "Chickens begin to lay eggs in anticipation of spring",
    startDate: { month: 1, day: 30 },
    endDate: { month: 2, day: 3 },
    solarTerm: "Daikan",
    imagery: ["chickens", "eggs", "new life"],
    colors: ["#F8E8D8", "#FFF0E0", "#FFF8E8"]
  }
];

export function getCurrentMicroseason(date: Date = new Date()): Microseason {
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  for (const season of microseasons) {
    const { startDate, endDate } = season;

    // Handle year-crossing (winter seasons)
    if (startDate.month > endDate.month) {
      if (
        (month === startDate.month && day >= startDate.day) ||
        (month === endDate.month && day <= endDate.day) ||
        (month > startDate.month) ||
        (month < endDate.month)
      ) {
        return season;
      }
    } else {
      // Normal case within same year
      if (
        (month === startDate.month && day >= startDate.day &&
         (month < endDate.month || (month === endDate.month && day <= endDate.day))) ||
        (month > startDate.month && month < endDate.month) ||
        (month === endDate.month && day <= endDate.day)
      ) {
        return season;
      }
    }
  }

  // Default to first season if no match found
  return microseasons[0];
}

export function getMicroseasonByDate(month: number, day: number): Microseason {
  return getCurrentMicroseason(new Date(2024, month - 1, day));
}
