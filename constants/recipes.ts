// Unit IDs and their localized labels
export type UnitId = 'kg' | 'g' | 'ml' | 'pcs' | 'tbsp' | 'tsp' | 'pinch';

export const UNIT_LABELS: Record<UnitId, { ru: string; sr: string }> = {
  kg:    { ru: 'кг',       sr: 'kg'        },
  g:     { ru: 'г',        sr: 'g'         },
  ml:    { ru: 'мл',       sr: 'ml'        },
  pcs:   { ru: 'шт',       sr: 'kom'       },
  tbsp:  { ru: 'ст.л.',    sr: 'kašike'    },
  tsp:   { ru: 'ч.л.',     sr: 'kašičice'  },
  pinch: { ru: 'по вкусу', sr: 'po ukusu'  },
};

export function formatAmount(amount: number, unit: UnitId, lang: 'ru' | 'sr'): string {
  const label = UNIT_LABELS[unit][lang];
  return `${amount} ${label}`;
}

export interface RecipeIngredient {
  id: string;
  amounts: Record<number, number>; // servings -> amount
  unit: UnitId;
  ru: string;
  sr: string;
  price?: number; // optional price per base serving
}

export interface RecipeStep {
  timer: number | null; // seconds, null = no timer
  ru: { title: string; body: string };
  sr: { title: string; body: string };
}

export interface RecipeData {
  id: string;
  baseServings: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
}

// ─── SARMA ───────────────────────────────────────────────────────────────────
const SARMA: RecipeData = {
  id: 'sarma',
  baseServings: 4,
  ingredients: [
    { id: 'cabbage',      amounts: { 2: 500, 4: 1000, 6: 1500, 8: 2000 }, unit: 'g',     ru: 'Квашеная капуста',         sr: 'Kiseli kupus',       price: 360 },
    { id: 'meat',         amounts: { 2: 250, 4: 500,  6: 750,  8: 1000 }, unit: 'g',     ru: 'Фарш свинина+говядина',    sr: 'Mleveno meso',       price: 980 },
    { id: 'rice',         amounts: { 2: 50,  4: 100,  6: 150,  8: 200  }, unit: 'g',     ru: 'Рис круглозёрный',         sr: 'Pirinač',            price: 85  },
    { id: 'onion',        amounts: { 2: 1,   4: 2,    6: 3,    8: 4    }, unit: 'pcs',   ru: 'Лук репчатый',             sr: 'Crni luk',           price: 95  },
    { id: 'breast',       amounts: { 2: 100, 4: 200,  6: 300,  8: 400  }, unit: 'g',     ru: 'Копчёная грудинка',        sr: 'Suva slanina',       price: 620 },
    { id: 'sausage',      amounts: { 2: 100, 4: 200,  6: 300,  8: 400  }, unit: 'g',     ru: 'Копчёная колбаса',         sr: 'Sušena kobasica',    price: 750 },
    { id: 'tomato_paste', amounts: { 2: 1,   4: 2,    6: 3,    8: 4    }, unit: 'tbsp',  ru: 'Томатная паста',           sr: 'Paradajz pasta',     price: 65  },
    { id: 'paprika',      amounts: { 2: 1,   4: 2,    6: 3,    8: 4    }, unit: 'tsp',   ru: 'Паприка сладкая',          sr: 'Aleva paprika',      price: 45  },
    { id: 'laurel',       amounts: { 2: 2,   4: 3,    6: 4,    8: 5    }, unit: 'pcs',   ru: 'Лавровый лист',            sr: 'List lovora',        price: 35  },
    { id: 'oil',          amounts: { 2: 30,  4: 50,   6: 70,   8: 90   }, unit: 'ml',    ru: 'Масло',                    sr: 'Suncokretovo ulje',  price: 32  },
    { id: 'salt',         amounts: { 2: 1,   4: 1,    6: 1,    8: 1    }, unit: 'pinch', ru: 'Соль и перец',             sr: 'So i biber',         price: 22  },
  ],
  steps: [
    { timer: 10 * 60, ru: { title: 'Подготовьте капусту',      body: 'Разберите квашеную капусту на отдельные листья. Если листья слишком солёные — промойте холодной водой и слегка отожмите.' }, sr: { title: 'Pripremite kupus',       body: 'Odvojite listove kiselog kupusa. Ako su previše slani — isperite hladnom vodom i blago iscedite.' } },
    { timer: 8 * 60,  ru: { title: 'Приготовьте фарш',         body: 'Мелко нарежьте лук. Смешайте фарш с луком, промытым рисом, паприкой, солью и перцем. Хорошо вымесите.' },                   sr: { title: 'Pripremite fil',         body: 'Sitno iseckajte luk. Pomešajte meso sa lukom, oprenim pirinčem, paprikom, solju i biberom. Dobro umesiti.' } },
    { timer: 15 * 60, ru: { title: 'Нарежьте копчёности',      body: 'Грудинку и колбасу нарежьте небольшими кусочками — они придадут бульону глубокий дымный аромат.' },                        sr: { title: 'Iseckajte sušeno meso',  body: 'Slaninu i kobasicu iseckajte na manje komade — daće čorbi duboku dimljenu aromu.' } },
    { timer: null,    ru: { title: 'Заверните голубцы',         body: 'На каждый капустный лист положите 1–2 ст.л. фарша. Заверните плотным конвертом, подгибая края.' },                         sr: { title: 'Zrolajte sarmu',         body: 'Na svaki list kupusa stavite 1–2 kašike fila. Zrolajte čvrsto poput koverta, savijajući ivice.' } },
    { timer: 20 * 60, ru: { title: 'Уложите в кастрюлю',       body: 'На дно кастрюли положите слой квашеной капусты. Уложите голубцы плотно. Перекладывайте слоями с копчёностями.' },           sr: { title: 'Složite u šerpu',        body: 'Na dno šerpe stavite sloj kiselog kupusa. Složite sarmu čvrsto. Redajte u slojevima sa sušenim mesom.' } },
    { timer: 120 * 60,ru: { title: 'Тушите на медленном огне', body: 'Залейте водой, чтобы едва покрыла. Добавьте томатную пасту и лавровый лист. Тушите на самом малом огне под крышкой.' },     sr: { title: 'Dinstajte na tihoj vatri', body: 'Prelijte vodom da jedva pokrije. Dodajte paradajz pastu i lovorov list. Kuvajte na najslabijoj vatri poklopljeno.' } },
    { timer: 15 * 60, ru: { title: 'Подача',                   body: 'Дайте сарме настояться 15 минут. Подавайте со сметаной, свежим хлебом и острым айваром. Наслаждайтесь!' },                 sr: { title: 'Posluživanje',           body: 'Ostavite sarmu da odstoji 15 minuta. Servirajte sa kiselom pavlakom, svežim hlebom i ljutim ajvarom.' } },
  ],
};

// ─── BORSHCH ─────────────────────────────────────────────────────────────────
const BORSHCH: RecipeData = {
  id: 'borshch',
  baseServings: 4,
  ingredients: [
    { id: 'beef',         amounts: { 2: 250, 4: 500,  6: 750,  8: 1000 }, unit: 'g',     ru: 'Говядина на кости',         sr: 'Govedina sa koskom'  },
    { id: 'beet',         amounts: { 2: 1,   4: 2,    6: 3,    8: 4    }, unit: 'pcs',   ru: 'Свёкла средняя',            sr: 'Cvekla srednja'       },
    { id: 'cabbage',      amounts: { 2: 200, 4: 400,  6: 600,  8: 800  }, unit: 'g',     ru: 'Капуста белокочанная',       sr: 'Beli kupus'           },
    { id: 'potato',       amounts: { 2: 2,   4: 3,    6: 4,    8: 5    }, unit: 'pcs',   ru: 'Картофель',                 sr: 'Krompir'              },
    { id: 'carrot',       amounts: { 2: 1,   4: 1,    6: 2,    8: 2    }, unit: 'pcs',   ru: 'Морковь',                   sr: 'Šargarepa'            },
    { id: 'onion',        amounts: { 2: 1,   4: 1,    6: 2,    8: 2    }, unit: 'pcs',   ru: 'Лук репчатый',              sr: 'Crni luk'             },
    { id: 'tomato_paste', amounts: { 2: 1,   4: 2,    6: 3,    8: 4    }, unit: 'tbsp',  ru: 'Томатная паста',            sr: 'Paradajz pasta'       },
    { id: 'garlic',       amounts: { 2: 1,   4: 2,    6: 3,    8: 4    }, unit: 'pcs',   ru: 'Чеснок (зубчик)',           sr: 'Beli luk (čen)'       },
    { id: 'vinegar',      amounts: { 2: 1,   4: 1,    6: 2,    8: 2    }, unit: 'tbsp',  ru: 'Уксус 9%',                  sr: 'Sirće 9%'             },
    { id: 'oil',          amounts: { 2: 30,  4: 50,   6: 70,   8: 90   }, unit: 'ml',    ru: 'Растительное масло',        sr: 'Suncokretovo ulje'    },
    { id: 'salt',         amounts: { 2: 1,   4: 1,    6: 1,    8: 1    }, unit: 'pinch', ru: 'Соль, перец, лавр',         sr: 'So, biber, lovor'     },
  ],
  steps: [
    { timer: 3600,  ru: { title: 'Сварить бульон',       body: 'Залить мясо холодной водой, довести до кипения, снять пену. Варить на малом огне час. Посолить за 15 минут до конца.' },                                                                              sr: { title: 'Skuvati supu',          body: 'Preliti meso hladnom vodom, prokuvati i skinuti penu. Kuvati na laganoj vatri sat vremena. Posoliti pred kraj.' } },
    { timer: 900,   ru: { title: 'Подготовить свёклу',    body: 'Свёклу нарезать тонкой соломкой. Обжарить на масле, добавить уксус и томатную пасту, тушить 10–15 минут до мягкости.' },                                                                           sr: { title: 'Pripremiti cveklu',     body: 'Iseckati cveklu na tanke rezance. Propržiti na ulju, dodati sirće i paradajz pastu, dinstati 10–15 min do mekoće.' } },
    { timer: 480,   ru: { title: 'Зажарка',               body: 'Лук и морковь нарезать кубиками, обжарить до золотистости. Это база вкуса всего супа.' },                                                                                                          sr: { title: 'Zaprška',               body: 'Iseckati luk i šargarepu na kockice, propržiti do zlatne boje. Ovo je osnova ukusa supe.' } },
    { timer: null,  ru: { title: 'Овощи в бульон',        body: 'Достать мясо, разобрать на куски, вернуть в кастрюлю. Заложить картофель кубиками, через 5 минут — нашинкованную капусту.' },                                                                     sr: { title: 'Povrće u supu',         body: 'Izvaditi meso, razdvojiti na komade, vratiti u lonac. Dodati krompir kockice, posle 5 min — iseckani kupus.' } },
    { timer: 1200,  ru: { title: 'Соединить всё',          body: 'Когда картофель почти готов, добавить зажарку и свёклу. Варить 15–20 минут на малом огне.' },                                                                                                     sr: { title: 'Sjediniti sve',         body: 'Kada je krompir skoro gotov, dodati zaprašku i cveklu. Kuvati 15–20 min na laganoj vatri.' } },
    { timer: 1800,  ru: { title: 'Дать настояться',        body: 'Снять с огня, добавить раздавленный чеснок и лавр. Накрыть крышкой и оставить минимум на полчаса — борщ должен «дойти». Подавать со сметаной и чёрным хлебом.' },                               sr: { title: 'Pustiti da odstoji',    body: 'Skloniti sa vatre, dodati zgnječeni beli luk i lovor. Poklopiti i ostaviti najmanje pola sata — boršč mora da se «slegne». Servirati sa pavlakom i crnim hlebom.' } },
  ],
};

// ─── PELMENI ─────────────────────────────────────────────────────────────────
const PELMENI: RecipeData = {
  id: 'pelmeni',
  baseServings: 4,
  ingredients: [
    { id: 'flour',   amounts: { 2: 250, 4: 500, 6: 750,  8: 1000 }, unit: 'g',     ru: 'Мука пшеничная',       sr: 'Pšenično brašno'    },
    { id: 'egg',     amounts: { 2: 1,   4: 2,   6: 3,    8: 4    }, unit: 'pcs',   ru: 'Яйцо',                 sr: 'Jaje'               },
    { id: 'water',   amounts: { 2: 100, 4: 200, 6: 300,  8: 400  }, unit: 'ml',    ru: 'Вода ледяная',         sr: 'Ledena voda'        },
    { id: 'beef',    amounts: { 2: 150, 4: 300, 6: 450,  8: 600  }, unit: 'g',     ru: 'Фарш говяжий',         sr: 'Mleveni govedina'   },
    { id: 'pork',    amounts: { 2: 150, 4: 300, 6: 450,  8: 600  }, unit: 'g',     ru: 'Фарш свиной',          sr: 'Mleveni svinjetina' },
    { id: 'onion',   amounts: { 2: 1,   4: 2,   6: 3,    8: 4    }, unit: 'pcs',   ru: 'Лук репчатый',         sr: 'Crni luk'           },
    { id: 'pepper',  amounts: { 2: 1,   4: 1,   6: 1,    8: 1    }, unit: 'pinch', ru: 'Соль и перец',         sr: 'So i biber'         },
    { id: 'butter',  amounts: { 2: 30,  4: 50,  6: 70,   8: 90   }, unit: 'g',     ru: 'Сливочное масло',      sr: 'Maslac'             },
  ],
  steps: [
    { timer: 600,   ru: { title: 'Замесить тесто',             body: 'В муку вбить яйцо, добавить ледяную воду и щепотку соли. Замешивать руками 10 минут — тесто должно стать гладким и упругим.' },                                                              sr: { title: 'Umesiti testo',              body: 'U brašno razbiti jaje, dodati ledenu vodu i prstohvat soli. Mesiti rukama 10 min — testo mora biti glatko i elastično.' } },
    { timer: 1800,  ru: { title: 'Дать тесту отдохнуть',       body: 'Завернуть тесто в плёнку и оставить на 30 минут при комнатной температуре. За это время клейковина расслабится, и раскатывать будет легко.' },                                              sr: { title: 'Pustiti testo da odmori',    body: 'Umotati testo u foliju i ostaviti 30 min na sobnoj temperaturi. Za to vreme će se gluten opustiti i razvijanje će biti lako.' } },
    { timer: null,  ru: { title: 'Сделать начинку',             body: 'Лук натереть на мелкой тёрке — он должен превратиться в пюре. Смешать с фаршами, посолить, поперчить. Добавить 2–3 ст.л. ледяной воды и тщательно вымесить.' },                           sr: { title: 'Spremiti nadev',             body: 'Luk izrendati na sitno — mora postati kaša. Pomešati sa mlevenim mesom, posoliti, zabiberiti. Dodati 2–3 kašike ledene vode i temeljno izmesiti.' } },
    { timer: 1800,  ru: { title: 'Слепить пельмени',            body: 'Раскатать тесто тонко (1.5 мм), вырезать кружки стаканом. На каждый положить 1 ч.л. фарша, защипнуть в полумесяц, соединить уголки.' },                                                   sr: { title: 'Praviti pelmene',            body: 'Razviti testo tanko (1.5 mm), iseći kružiće čašom. Na svaki staviti 1 kašičicu nadeva, sklopiti u polumesec, spojiti uglove.' } },
    { timer: 480,   ru: { title: 'Сварить',                     body: 'В большой кастрюле вскипятить подсоленную воду. Опускать пельмени партиями, помешивать. Когда всплывут — варить ещё 5 минут.' },                                                            sr: { title: 'Skuvati',                    body: 'U velikom loncu prokuvati posoljenu vodu. Spuštati pelmene u serijama, mešati. Kad isplivaju — kuvati još 5 min.' } },
    { timer: null,  ru: { title: 'Подавать',                    body: 'Вынуть шумовкой, заправить растопленным сливочным маслом. Подавать со сметаной, уксусом или горчицей. Бульон от варки — отдельно как первое.' },                                          sr: { title: 'Servirati',                  body: 'Izvaditi cediljkom, preliti otopljenim maslacem. Servirati sa pavlakom, sirćetom ili senfom. Supa od kuvanja — posebno kao predjelo.' } },
  ],
};

// ─── ĆEVAPI ──────────────────────────────────────────────────────────────────
const CEVAPI: RecipeData = {
  id: 'cevapi',
  baseServings: 4,
  ingredients: [
    { id: 'beef',    amounts: { 2: 250, 4: 500, 6: 750, 8: 1000 }, unit: 'g',     ru: 'Фарш говяжий',              sr: 'Mleveni govedina'           },
    { id: 'lamb',    amounts: { 2: 100, 4: 200, 6: 300, 8: 400  }, unit: 'g',     ru: 'Фарш бараний',              sr: 'Mleveno jagnjeće'           },
    { id: 'onion',   amounts: { 2: 1,   4: 2,   6: 3,   8: 4    }, unit: 'pcs',   ru: 'Лук репчатый',              sr: 'Crni luk'                   },
    { id: 'garlic',  amounts: { 2: 2,   4: 4,   6: 6,   8: 8    }, unit: 'pcs',   ru: 'Чеснок (зубчик)',           sr: 'Beli luk (čen)'             },
    { id: 'soda',    amounts: { 2: 1,   4: 1,   6: 1,   8: 1    }, unit: 'pinch', ru: 'Сода пищевая',              sr: 'Soda bikarbona'             },
    { id: 'paprika', amounts: { 2: 1,   4: 2,   6: 3,   8: 4    }, unit: 'tsp',   ru: 'Паприка сладкая',           sr: 'Slatka aleva paprika'       },
    { id: 'salt',    amounts: { 2: 1,   4: 1,   6: 1,   8: 1    }, unit: 'pinch', ru: 'Соль, перец чёрный',        sr: 'So, crni biber'             },
    { id: 'kajmak',  amounts: { 2: 100, 4: 200, 6: 300, 8: 400  }, unit: 'g',     ru: 'Каймак (для подачи)',        sr: 'Kajmak (za serviranje)'     },
  ],
  steps: [
    { timer: null,  ru: { title: 'Вымесить фарш',    body: 'Соединить два вида фарша в большой миске. Чеснок раздавить, добавить соду, паприку, соль и перец. Вымешивать руками 5–7 минут — фарш должен стать тягучим и однородным.' },    sr: { title: 'Umesiti meso',     body: 'Sjediniti dve vrste mesa u većoj posudi. Zgnječiti beli luk, dodati sodu, papriku, so i biber. Mesiti rukama 5–7 min — masa mora biti elastična i ujednačena.' } },
    { timer: 7200,  ru: { title: 'Маринование',       body: 'Накрыть и убрать в холодильник минимум на 2 часа, лучше на ночь. Это критически важно — без этого чевапи будут жёсткими.' },                                                sr: { title: 'Mariniranje',      body: 'Poklopiti i staviti u frižider najmanje 2 sata, najbolje preko noći. Ovo je ključno — bez toga ćevapi neće biti meki.' } },
    { timer: null,  ru: { title: 'Сформовать',         body: 'Влажными руками катать колбаски длиной 7–8 см и толщиной с большой палец. Размер должен быть одинаковым — иначе одни сгорят, другие не пропекутся.' },                   sr: { title: 'Oblikovati',       body: 'Vlažnim rukama valjati kobasice dužine 7–8 cm i debljine palca. Veličina mora biti ista — inače će jedni izgoreti, drugi ostati sirovi.' } },
    { timer: 480,   ru: { title: 'Жарить на гриле',   body: 'Разогреть гриль или сковороду-гриль до сильного жара. Выкладывать чевапи, не двигать первые 2 минуты — пусть схватится корочка. Затем переворачивать каждые 1–2 минуты до румяной корочки со всех сторон.' }, sr: { title: 'Peći na roštilju', body: 'Zagrejati roštilj ili tiganj jako. Stavljati ćevape, ne pomerati prve 2 min — neka se uhvati korica. Zatim okretati svake 1–2 min do rumene boje sa svih strana.' } },
    { timer: null,  ru: { title: 'Подавать',           body: 'Подавать в лепёшке (лепинье) или просто на тарелке с нарезанным сырым луком, ложкой каймака и айваром. Хлеб обязателен — макать в мясной сок.' },                      sr: { title: 'Servirati',        body: 'Servirati u lepinji ili na tanjiru sa iseckanim sirovim lukom, kajmakom i ajvarom. Hleb je obavezan — umakati u sok od mesa.' } },
  ],
};

// ─── BUREK ───────────────────────────────────────────────────────────────────
const BUREK: RecipeData = {
  id: 'burek',
  baseServings: 4,
  ingredients: [
    { id: 'phyllo',  amounts: { 2: 250, 4: 500, 6: 750,  8: 1000 }, unit: 'g',     ru: 'Тесто фило (готовое)',    sr: 'Jufke (gotove)'          },
    { id: 'meat',    amounts: { 2: 150, 4: 300, 6: 450,  8: 600  }, unit: 'g',     ru: 'Фарш говяжий',           sr: 'Mleveni govedina'        },
    { id: 'onion',   amounts: { 2: 1,   4: 2,   6: 3,    8: 4    }, unit: 'pcs',   ru: 'Лук репчатый',           sr: 'Crni luk'                },
    { id: 'oil',     amounts: { 2: 50,  4: 100, 6: 150,  8: 200  }, unit: 'ml',    ru: 'Растительное масло',     sr: 'Suncokretovo ulje'       },
    { id: 'yogurt',  amounts: { 2: 100, 4: 200, 6: 300,  8: 400  }, unit: 'ml',    ru: 'Йогурт натуральный',     sr: 'Kiselo mleko'            },
    { id: 'salt',    amounts: { 2: 1,   4: 1,   6: 1,    8: 1    }, unit: 'pinch', ru: 'Соль, перец',            sr: 'So, biber'               },
  ],
  steps: [
    { timer: 600,   ru: { title: 'Подготовить начинку', body: 'Лук мелко нарезать, обжарить на ложке масла до прозрачности. Добавить фарш, разбивая комки, обжарить до изменения цвета. Посолить, поперчить. Остудить — горячий фарш порвёт тесто.' },                                                                     sr: { title: 'Pripremiti nadev',    body: 'Sitno iseckati luk, propržiti na malo ulja do prozirnosti. Dodati mleveno meso, razbijajući grudvice, propržiti dok ne promeni boju. Posoliti, zabiberiti. Ohladiti — vruć nadev će pocepati testo.' } },
    { timer: null,  ru: { title: 'Расстелить тесто',    body: 'На стол постелить полотенце, на нём расстелить лист фило. Сбрызнуть маслом из пульверизатора (не лить — иначе тесто промокнет). Положить второй лист поверх.' },                                                                                         sr: { title: 'Razviti testo',       body: 'Na sto staviti peškir, na njega rasprostrti jufku. Poprskati uljem (ne sipati — natopiće se). Staviti drugu jufku odozgo.' } },
    { timer: null,  ru: { title: 'Свернуть улиткой',    body: 'Вдоль длинного края выложить тонкую полоску начинки. Скатать в рулет с помощью полотенца — полотенце поднимает край и помогает не порвать тесто. Готовый рулет свернуть улиткой.' },                                                                  sr: { title: 'Saviti u puža',       body: 'Duž duže strane staviti tanku traku nadeva. Smotati u rolnu pomoću peškira — peškir podiže ivicu i pomaže da se testo ne pocepa. Gotovu rolnu saviti u puža.' } },
    { timer: 2400,  ru: { title: 'Запекать',             body: 'Уложить улитку в смазанную маслом круглую форму. Сверху смазать остатками масла. Запекать в духовке при 200°C 35–40 минут до золотисто-коричневой корочки.' },                                                                                        sr: { title: 'Peći',                body: 'Staviti puža u namazani okrugli pleh. Odozgo premazati ostatkom ulja. Peći u rerni na 200°C 35–40 min do zlatno-braon boje.' } },
    { timer: 600,   ru: { title: 'Подавать с йогуртом', body: 'Дать остыть 10 минут — горячий бурек обжигает. Резать треугольниками от центра. Обязательно подавать со стаканом холодного йогурта (кисело млеко) — это классика.' },                                                                                  sr: { title: 'Servirati sa kiselim mlekom', body: 'Pustiti da se ohladi 10 min — vruć burek peče. Seći trouglovima od centra. Obavezno servirati uz čašu hladnog kiselog mleka — to je klasika, bez toga ne ide.' } },
  ],
};

// ─── GIBANICA ─────────────────────────────────────────────────────────────────
const GIBANICA: RecipeData = {
  id: 'gibanica',
  baseServings: 6,
  ingredients: [
    { id: 'phyllo',   amounts: { 2: 200, 4: 400, 6: 500, 8: 700 }, unit: 'g',     ru: 'Тесто фило',                         sr: 'Jufke'            },
    { id: 'cheese',   amounts: { 2: 200, 4: 400, 6: 500, 8: 700 }, unit: 'g',     ru: 'Сыр белый рассольный (брынза)',       sr: 'Beli sir'         },
    { id: 'cottage',  amounts: { 2: 100, 4: 200, 6: 250, 8: 350 }, unit: 'g',     ru: 'Творог',                             sr: 'Mladi sir'        },
    { id: 'egg',      amounts: { 2: 2,   4: 4,   6: 5,   8: 7   }, unit: 'pcs',   ru: 'Яйцо',                               sr: 'Jaje'             },
    { id: 'milk',     amounts: { 2: 100, 4: 200, 6: 250, 8: 350 }, unit: 'ml',    ru: 'Молоко',                             sr: 'Mleko'            },
    { id: 'yogurt',   amounts: { 2: 100, 4: 200, 6: 250, 8: 350 }, unit: 'ml',    ru: 'Йогурт',                             sr: 'Kiselo mleko'     },
    { id: 'oil',      amounts: { 2: 50,  4: 100, 6: 120, 8: 170 }, unit: 'ml',    ru: 'Растительное масло',                 sr: 'Suncokretovo ulje'},
    { id: 'butter',   amounts: { 2: 30,  4: 60,  6: 80,  8: 110 }, unit: 'g',     ru: 'Сливочное масло (растопленное)',     sr: 'Otopljeni maslac' },
    { id: 'salt',     amounts: { 2: 1,   4: 1,   6: 1,   8: 1   }, unit: 'pinch', ru: 'Соль',                               sr: 'So'               },
  ],
  steps: [
    { timer: null,  ru: { title: 'Сделать начинку',      body: 'Раскрошить белый сыр, смешать с творогом. Вбить яйца (оставить одно для смазки сверху), влить молоко и йогурт, посолить. Размешать в однородную массу — должна быть консистенции густой сметаны.' },                     sr: { title: 'Napraviti nadev',        body: 'Izmrviti beli sir, pomešati sa mladim sirom. Razbiti jaja (ostaviti jedno za premazivanje), uliti mleko i kiselo mleko, posoliti. Promešati u homogenu masu — gušča od pavlake.' } },
    { timer: null,  ru: { title: 'Подготовить форму',    body: 'Прямоугольную форму смазать маслом. Положить на дно один лист фило целиком — он будет основой и стенками.' },                                                                                               sr: { title: 'Pripremiti pleh',        body: 'Pleh namazati uljem. Na dno staviti jednu jufku celu — ona je osnova i zidovi.' } },
    { timer: 1200,  ru: { title: 'Слой за слоем',        body: 'Брать лист фило, окунать обеими руками в начинку — лист должен пропитаться и слегка скомкаться. Укладывать в форму складками. Между каждыми 2–3 листами слегка сбрызнуть маслом. Так заполнить всю форму.' }, sr: { title: 'Sloj po sloj',           body: 'Uzimati jufku, umakati obema rukama u nadev — list mora da se natopi i blago zgužva. Slagati u pleh u naborima. Između svakih 2–3 lista blago poprskati uljem. Tako napuniti pleh.' } },
    { timer: null,  ru: { title: 'Закрыть и смазать',    body: 'Последний лист уложить целиком сверху, подвернуть края. Смазать взбитым яйцом, сверху полить растопленным сливочным маслом — это даёт хрустящую корочку.' },                                              sr: { title: 'Zatvoriti i premazati',  body: 'Poslednju jufku staviti celu odozgo, podviti ivice. Premazati umućenim jajetom, preliti otopljenim maslacem — to daje hrskavu koricu.' } },
    { timer: 2700,  ru: { title: 'Запекать',              body: 'Запекать в духовке при 180°C 45 минут. Корочка должна стать золотисто-коричневой и хрустящей. Если темнеет слишком быстро — накрыть фольгой.' },                                                         sr: { title: 'Peći',                   body: 'Peći u rerni na 180°C 45 minuta. Korica mora postati zlatno-braon i hrskava. Ako tamni prebrzo — prekriti folijom.' } },
    { timer: 600,   ru: { title: 'Дать настояться',       body: 'Вынуть из духовки и дать постоять 10 минут — гибаница «схватится» и не развалится при нарезке. Резать квадратами. Подавать тёплой с холодным йогуртом — на завтрак или ужин.' },                       sr: { title: 'Pustiti da odstoji',     body: 'Izvaditi i pustiti 10 min — gibanica će se «slegnuti» i neće se raspasti pri sečenju. Seći na kvadrate. Servirati toplu sa hladnim kiselim mlekom — za doručak ili večeru.' } },
  ],
};

// ─── Registry ─────────────────────────────────────────────────────────────────
export const RECIPES: Record<string, RecipeData> = {
  sarma:    SARMA,
  borshch:  BORSHCH,
  pelmeni:  PELMENI,
  cevapi:   CEVAPI,
  burek:    BUREK,
  gibanica: GIBANICA,
};

export const FULL_RECIPE_IDS = new Set(Object.keys(RECIPES));
