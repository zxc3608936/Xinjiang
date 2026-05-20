import { DayData } from './types';

export const tourData: DayData[] = [
  {
    id: 'd1',
    dayNum: 1,
    date: '2026.06.13',
    shortDate: '06.13',
    locations: '台北出發 ➜ 上海',
    weather: '晴 🌤️',
    temp: '22°C / 28°C',
    dress: '輕薄長袖、舒適便服',
    events: [
      {
        id: 'e1-0',
        time: '13:30',
        category: 'transport',
        title: '機場接送',
        desc: '從家裡出發前往機場',
      },
      {
        id: 'e1-1',
        time: '6/13 17:15',
        category: 'flight',
        title: '啟程：台北松山(TSA) 至 上海虹橋(SHA)',
        desc: '東方航空 MU5098。預計 18:55 抵達上海虹橋機場第一航廈。',
        flightNo: 'MU5098',
        trackingNo: 'CES6098',
        flightInfo: {
          origin: "台北松山",
          originCode: "TSA",
          originTerminal: "T1",
          dest: "上海虹橋",
          destCode: "SHA",
          destTerminal: "T1",
          duration: "1h 40m"
        }
      },
      {
        id: 'e1-2',
        category: 'hotel',
        title: '上海轉機等待',
        desc: '自行安排轉機住宿或於機場附近休息，準備明日清晨班機。'
      }
    ]
  },
  {
    id: 'd2',
    dayNum: 2,
    date: '2026.06.14',
    shortDate: '06.14',
    locations: '上海轉機 ➜ 烏魯木齊',
    weather: '晴 🌤️',
    temp: '18°C / 28°C',
    dress: '輕薄長袖、薄外套',
    events: [
      {
        id: 'e2-1',
        time: '6/14 06:35',
        category: 'flight',
        title: '中轉：上海虹橋(SHA) 至 烏魯木齊(URC)',
        desc: '東方航空 MU5633。預計 12:00 抵達天山國際機場。',
        flightNo: 'MU5633',
        flightInfo: {
          origin: "上海虹橋",
          originCode: "SHA",
          originTerminal: "T2",
          dest: "烏魯木齊",
          destCode: "URC",
          destTerminal: "T2",
          duration: "5h 25m"
        }
      },
      {
        id: 'e2-2',
        time: '14:00',
        category: 'transport',
        title: '24小時接機服務',
        desc: '歡迎來到亞心之都！專車接送前往市區飯店。',
      },
      {
        id: 'e2-3',
        time: '15:00',
        category: 'hotel',
        title: '入住烏魯木齊市區飯店',
        desc: '烏魯木齊高鐵站OBOR家酒店 或 紅光山國際會展中心暻閣酒店。全天自由活動，餐券自理。',
        query: '乌鲁木齐高铁站OBOR家酒店'
      }
    ]
  },
  {
    id: 'd3',
    dayNum: 3,
    date: '2026.06.15',
    shortDate: '06.15',
    locations: '烏魯木齊 ➜ 天山天池 ➜ S21沙漠公路 ➜ 阿勒泰',
    weather: '多雲 ⛅',
    temp: '15°C / 26°C',
    dress: '洋蔥式穿搭、防風外套',
    events: [
      {
        id: 'e3-1',
        time: '08:30',
        category: 'attraction',
        title: '天山天池 (含區間車)',
        desc: '被譽為神話中西王母的「瑤池」。湖水清澈，倒映著博格達峰，景緻如仙境。',
        image: '/Tian_Shan.jpg',
        detailedDesc: '天山天池風景名勝區位於新疆維吾爾自治區阜康市境內，距烏魯木齊市約97公里。這裡曾被稱為「瑤池」，傳說中是西王母沐浴的地方。天池湖面海拔1910米，最深處達105米。湖水清澈碧透，四週群山環抱，雲杉參天，風景猶如人間仙境。景區內包括石門一線、西小天池、定海神針等多處知名景點。',
        query: '天山天池',
      },
      {
        id: 'e3-2',
        time: '15:00',
        category: 'transport',
        title: '穿越 S21 沙漠公路',
        desc: '途經古爾班通古特沙漠，欣賞壯麗沙丘與多變地貌。',
        image: '/S21.jpg',
        detailedDesc: 'S21阿烏高速公路是中國首條沙漠高速公路。全長近343公里，其中一部分穿越了中國第二大沙漠——古爾班通古特沙漠。行駛在公路上，兩側是連綿起伏的沙丘、獨特的雅丹地貌，以及頑強生長的沙漠植被（如紅柳和梭梭）。這條公路不僅大幅縮短了烏魯木齊至阿勒泰的車程，更是不可多得的沙漠自駕體驗。',
        query: 'S21沙漠公路'
      },
      {
        id: 'e3-3',
        time: '19:00',
        category: 'hotel',
        title: '抵達阿勒泰市並入住',
        desc: '阿勒泰錦江國際酒店 或 尊茂寶石酒店或同級飯店。',
        query: '阿勒泰锦江国际酒店'
      }
    ]
  },
  {
    id: 'd4',
    dayNum: 4,
    date: '2026.06.16',
    shortDate: '06.16',
    locations: '阿勒泰 ➜ 阿禾公路 ➜ 禾木風景區',
    weather: '晴朗 ☀️',
    temp: '12°C / 22°C',
    dress: '保暖外套、舒適好走的鞋',
    events: [
      {
        id: 'e4-1',
        time: '08:00',
        category: 'transport',
        title: '阿禾公路 (專屬最美冰雪景觀大道)',
        desc: '沿途風光如畫，路景融合，直達原始村落。',
        image: '/Ahe_Highway.jpg',
        detailedDesc: '阿禾公路連接阿勒泰市和禾木村，是一條將阿勒泰地區的自然風光展現得淋漓盡致的景觀道。全長約208公里，沿途經過峽谷、森林、草原和雪山等多樣的自然景觀。不同季節這裡有著截然不同的魅力，尤其是秋季的彩林和冬季的冰雪世界，美得讓人屏息，是前往禾木村的最佳景觀路線。',
      },
      {
        id: 'e4-2',
        time: '13:30',
        category: 'attraction',
        title: '禾木風景區與觀景台',
        desc: '圖瓦人的原始村莊，散落著小木屋。在觀景台俯瞰全景，恍如來到童話世界。',
        image: '/Hemu.jpg',
        detailedDesc: '禾木村位於新疆布爾津縣喀納斯湖畔，是圖瓦人的集中生活居住地，也是中國僅存的三個圖瓦人村落（禾木村、喀納斯村和白哈巴村）中最遠和最大的村莊。在這裡，一切都顯得寧靜祥和。一棟棟的小木屋散佈在山谷中，清晨時分，當陽光灑向村落，炊煙裊裊升起，與白樺林、雪山交相輝映，被譽為「神的自留地」。登上哈登觀景台，可以將整個禾木村的醉人風光盡收眼底。',
        query: '禾木风景区',
      },
      {
        id: 'e4-3',
        time: '19:00',
        category: 'hotel',
        title: '入住禾木景區內木屋',
        desc: '禾盛山莊 或 金蓮花酒店。體驗最道地的圖瓦人木屋風情，夜間氣溫低請注意保暖。',
        query: '禾木村'
      }
    ]
  },
  {
    id: 'd5',
    dayNum: 5,
    date: '2026.06.17',
    shortDate: '06.17',
    locations: '禾木 ➜ 喀納斯 ➜ 布爾津',
    weather: '陰 ☁️',
    temp: '10°C / 20°C',
    dress: '防雨外套、長褲',
    events: [
      {
        id: 'e5-1',
        time: '09:00',
        category: 'attraction',
        title: '喀納斯景區 (東方小瑞士)',
        desc: '探訪神秘莫測的喀納斯湖，湖水隨天氣變換色彩。',
        image: '/Kanas.jpg',
        detailedDesc: '喀納斯國家地質公園位於新疆阿勒泰地區，這裡的喀納斯湖是中國最深的高山淡水湖，以其神祕的「湖怪」傳說和隨季節、天氣變化顏色的湖水而聞名。湖畔生長著茂密的西伯利亞泰加林，秋季時層林盡染，金黃的白樺與常綠的雲杉錯落有致。被譽為「東方小瑞士」的喀納斯，集冰川、湖泊、森林、草原於一體，被聯合國教科文組織評定為「世界絕美之地」。',
        query: '喀纳斯湖',
      },
      {
        id: 'e5-2',
        time: '16:00',
        category: 'attraction',
        title: '漫步三灣：神仙灣、月亮灣、臥龍灣',
        desc: '喀納斯著名的S型河灣，湖水幽靜、光影交錯，為攝影愛好者的天堂。',
        image: '/Sanctuary_Cove.jpg',
        detailedDesc: '神仙灣、月亮灣和臥龍灣被譽為喀納斯景區的「三灣」，沿著喀納斯河蜿蜒而下。神仙灣常年雲霧繚繞，宛如仙境；月亮灣的河床形成優美的半月形，湖水顏色宛如翡翠，是喀納斯的標誌性景觀；臥龍灣則因河中的小島形似巨大的臥龍而得名。沿著湖畔的木棧道徒步，是欣賞這三灣絕美風光、感受幽靜自然的最佳方式。',
        query: '神仙湾'
      },
      {
        id: 'e5-3',
        time: '20:00',
        category: 'hotel',
        title: '入住布爾津5鑽飯店',
        desc: '布爾津喀納斯白樺林野奢營地。',
        query: '布尔津喀纳斯白桦林野奢营地'
      }
    ]
  },
  {
    id: 'd6',
    dayNum: 6,
    date: '2026.06.18',
    shortDate: '06.18',
    locations: '布爾津 ➜ 烏爾禾世界魔鬼城 ➜ 胡楊河市/獨山子區',
    weather: '風沙 💨',
    temp: '18°C / 30°C',
    dress: '防曬衣、帽子、墨鏡',
    events: [
      {
        id: 'e6-1',
        time: '08:50',
        category: 'attraction',
        title: '烏爾禾世界魔鬼城',
        desc: '中國最美的雅丹地貌之一。搭乘小火車穿梭巨石柱間，感受奇特風蝕景觀。',
        image: '/Urho_Ghost_City.jpg',
        detailedDesc: '烏爾禾世界魔鬼城，又稱烏爾禾風城，位於新疆克拉瑪依市，是中國最美的雅丹地貌之一。經歷了百萬年的風雨剝蝕，這裡形成了千姿百態的土丘，有的像雄鷹、有的像孔雀，還有狀如古堡的巨大石柱群。當狂風大作時，風穿過土丘的縫隙發出陣陣淒厲的怪響，彷彿鬼哭狼嚎，因此得名「魔鬼城」。這裡也是多部知名電影（如《臥虎藏龍》、《七劍下天山》）的取景地。',
        query: '乌尔禾魔鬼城',
      },
      {
        id: 'e6-2',
        time: '19:30',
        category: 'hotel',
        title: '入住胡楊河市/獨山子區飯店',
        desc: '胡楊河開元名庭大酒店 或 獨山子瑪依塔柯酒店。',
        query: '胡杨河开元名庭大酒店'
      }
    ]
  },
  {
    id: 'd7',
    dayNum: 7,
    date: '2026.06.19',
    shortDate: '06.19',
    locations: '獨山子 ➜ 獨庫公路 ➜ 巴音布魯克',
    weather: '晴 🌤️',
    temp: '12°C / 25°C',
    dress: '透氣衣物、防曬',
    events: [
      {
        id: 'e7-1',
        time: '08:30',
        category: 'transport',
        title: '穿越獨庫公路 (管制備案：賽里木湖)',
        desc: '橫跨天山，體驗「一日遊四季，十里不同天」的震撼公路美景。',
        detailedDesc: '獨庫公路（獨山子至庫車）被譽為中國最美也是最險峻的公路之一。全長561公里，橫亙天山山脈，連接南北疆。因為海拔落差大，氣候多變，行駛在這條路上，可以在一天內看盡峽谷、雪山、草原和森林等多種截然不同的景觀，真正體驗「一日遊四季，十里不同天」的奇妙感受。公路每年僅開放約四到五個月（通常為6月至10月）。',
      },
      {
        id: 'e7-2',
        time: '14:30',
        category: 'attraction',
        title: '巴音布魯克濕地與天鵝湖',
        desc: '碧綠草原中央的寧靜湖泊，並可於九曲十八彎觀景台欣賞日落奇景。',
        image: '/Bayinbuluke.jpg',
        detailedDesc: '巴音布魯克草原位於天山山脈中段的高山盆地，是中國第二大草原，也是中國最大的高山草原。這裡有著名的「天鵝湖」，每年春天，成千上萬的大天鵝、小天鵝及疣鼻天鵝會從南方飛來這裡繁衍生息。而「九曲十八彎」的開都河流經平坦的草原，在夕陽西下時，河面上會同時倒映出多個太陽的奇景，壯美無比，令人歎為觀止。',
        query: '巴音布鲁克草原',
      },
      {
        id: 'e7-3',
        time: '20:00',
        category: 'hotel',
        title: '入住特色營地',
        desc: '飛馳巴音度假營地，享受夜晚觀星。',
        query: '飞驰巴音度假营地'
      }
    ]
  },
  {
    id: 'd8',
    dayNum: 8,
    date: '2026.06.20',
    shortDate: '06.20',
    locations: '巴音布魯克 ➜ 那拉提草原 ➜ 伊寧市',
    weather: '多雲微陣雨 🌦️',
    temp: '15°C / 24°C',
    dress: '長袖長褲、攜帶雨具',
    events: [
      {
        id: 'e8-1',
        time: '13:30',
        category: 'attraction',
        title: '那拉提旅遊風景區 (空中草原)',
        desc: '世界四大草原之一。山峰、森林、峽谷交相輝映，盡情感受哈薩克民俗風情。',
        image: '/Nalati.jpg',
        detailedDesc: '那拉提草原地處天山腹地，被譽為「空中草原」，是世界上著名的四大河谷草原之一。這裡不僅有起伏的翠綠草甸、茂盛的原始森林，還有戴雪的山峰交相輝映，景色立體而豐富。除了絕美的自然風光，那拉提也是哈薩克族人口聚居最集中的地區之一，在此可以深入體驗騎馬、射箭、品嚐奶茶等濃郁的濃郁的哈薩克民族風情。',
        query: '那拉提草原',
      },
      {
        id: 'e8-2',
        time: '21:30',
        category: 'hotel',
        title: '入住伊寧市飯店',
        desc: '伊寧溫州國際大酒店 或 伊寧伊犁河賓館。',
        query: '伊宁温州国际大酒店'
      }
    ]
  },
  {
    id: 'd9',
    dayNum: 9,
    date: '2026.06.21',
    shortDate: '06.21',
    locations: '伊寧市 ➜ 賽里木湖 ➜ 胡楊河/奎屯',
    weather: '晴朗 ☀️',
    temp: '16°C / 26°C',
    dress: '休閒衣物、防曬、大衣(湖邊冷)',
    events: [
      {
        id: 'e9-1',
        time: '11:30',
        category: 'attraction',
        title: '賽里木湖 (大西洋的最後一滴眼淚)',
        desc: '高山湖泊，水天競碧。沿著湖邊環湖，還可探訪成吉思汗點將台遺址。',
        image: '/sayram-lake.jpg',
        detailedDesc: '賽里木湖位於新疆博爾塔拉蒙古自治州，是新疆海拔最高、面積最大的高山冷水湖。因為它地處大西洋暖濕氣流最後眷顧的地方，因此被浪漫地稱為「大西洋最後一滴眼淚」。湖水清澈透底，呈現出令人心醉的湛藍色。四周雪山環繞，夏天時湖畔開滿各色野花。沿著環湖公路行駛，可以欣賞到水天一色、雪山倒影的絕美畫卷。',
        query: '赛里木湖',
      },
      {
        id: 'e9-2',
        time: '21:00',
        category: 'hotel',
        title: '入住胡楊河或奎屯市區飯店',
        desc: '奎屯金陵國際飯店 或 胡楊河開元名庭大酒店。',
        query: '奎屯金陵国际饭店'
      }
    ]
  },
  {
    id: 'd10',
    dayNum: 10,
    date: '2026.06.22',
    shortDate: '06.22',
    locations: '奎屯 ➜ 獨山子大峽谷 ➜ 烏魯木齊',
    weather: '多雲 ⛅',
    temp: '20°C / 30°C',
    dress: '涼爽夏裝、薄外套',
    events: [
      {
        id: 'e10-1',
        time: '11:00',
        category: 'attraction',
        title: '獨山子大峽谷',
        desc: '天山雪水與雨水沖刷而成的神奇峽谷，谷壁陡峭，呈現充滿層次感的灰色泥塑景觀。',
        image: '/Dushanzi.jpeg',
        detailedDesc: '獨山子大峽谷是奎屯河的傑作，由天山冰雪融水和雨季形成的洪水經過千萬年沖刷、切割而形成。峽谷兩岸的階地陡峭，如同被利斧劈開，谷壁上的泥塑結構在風雨的刻畫下，形成了獨特而震撼的「大地肌理」與雕塑般的藝術景觀。站在峽谷邊緣俯瞰，深邃的谷底與蒼涼的陡壁形成強烈對比，展現出大自然鬼斧神工的原始力量。',
        query: '独山子大峡谷',
      },
      {
        id: 'e10-2',
        time: '19:00',
        category: 'hotel',
        title: '返回烏魯木齊',
        desc: '入住紅光山國際會展中心暻閣酒店 或 麗斯頓國際酒店。',
        query: '乌鲁木齐红光山国际会展中心'
      }
    ]
  },
  {
    id: 'd11',
    dayNum: 11,
    date: '2026.06.23',
    shortDate: '06.23',
    locations: '烏魯木齊 ➜ 上海浦東 (返程班機)',
    weather: '晴 🌤️',
    temp: '22°C / 32°C',
    dress: '輕薄透氣衣裝',
    events: [
      {
        id: 'e11-1',
        time: '上午',
        category: 'activity',
        title: '烏魯木齊市區自由探索',
        desc: '可以去大巴扎逛逛，品嘗饢、烤肉等西北特色乾果小吃，為家人帶些伴手禮。',
        detailedDesc: '新疆國際大巴扎是世界規模最大的大巴扎（集市），集伊斯蘭文化、建築、民族商貿於一體，被稱為「新疆之窗」。在這裡，您可以買到各式各樣的新疆特產，包括堅果、葡萄乾、絲綢、手工藝品和和田玉器。同時這裡也是美食天堂，熱氣騰騰的烤肉、香甜的烤包子、金黃的薄皮包子以及各式手抓飯，絕對讓這趟旅程留下深刻的味覺印記。',
        query: '新疆国际大巴扎',
      },
      {
        id: 'e11-2',
        time: '18:00',
        category: 'transport',
        title: '機場專車送機',
        desc: '提供全天候免費送機服務至 天山國際機場。期待下一次的新疆之旅！',
      },
      {
        id: 'e11-3',
        time: '6/23 20:20',
        category: 'flight',
        title: '起飛：烏魯木齊(URC) 至 上海浦東(PVG)',
        desc: '上海航空 FM9224。預計明日 01:15 抵達上海浦東機場。',
        flightNo: 'FM9224',
        trackingNo: 'CSH9224',
        flightInfo: {
          origin: "烏魯木齊",
          originCode: "URC",
          originTerminal: "T2",
          dest: "上海浦東",
          destCode: "PVG",
          destTerminal: "T1",
          duration: "4h 55m"
        }
      }
    ]
  },
  {
    id: 'd12',
    dayNum: 12,
    date: '2026.06.24',
    shortDate: '06.24',
    locations: '上海轉機 ➜ 台北桃園 (抵達)',
    weather: '多雲 ⛅',
    temp: '24°C / 30°C',
    dress: '舒適簡便',
    events: [
      {
        id: 'e12-1',
        time: '6/24 12:20',
        category: 'flight',
        title: '中轉：上海浦東(PVG) 至 台北桃園(TPE)',
        desc: '東方航空 MU5007。預計 14:25 抵達台北，為這趟旅程畫下完美句點。',
        flightNo: 'MU5007',
        flightInfo: {
          origin: "上海浦東",
          originCode: "PVG",
          originTerminal: "T1",
          dest: "台北桃園",
          destCode: "TPE",
          destTerminal: "T2",
          duration: "2h 5m"
        }
      }
    ]
  }
];
