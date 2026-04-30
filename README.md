# 🍲 ТРАПЕЗА · TRPEZA

> Двуязычное мобильное приложение с рецептами русской и сербской кухни для Google Play
>
> *Bilingual mobile recipe app — Russian & Serbian cuisine for the Google Play Store*

[![Status](https://img.shields.io/badge/status-prototype-yellow)]()
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)]()
[![Built with](https://img.shields.io/badge/built%20with-OnSpace.ai-purple)]()
[![Language](https://img.shields.io/badge/lang-RU%20%7C%20SR-red)]()

---

## 🇷🇺 Русская версия

### О проекте

**ТРАПЕЗА** — мобильное приложение для русских, живущих в Сербии (и для сербов, любящих русскую кухню). Соединяет две кулинарные традиции в одном красивом интерфейсе.

Эстетика приложения — **«гастрономический журнал»**: тёплая палитра, крафтовая бумага, шрифты Playfair Display курсивом. Это не очередное food-delivery приложение, а скорее цифровая версия премиального кулинарного издания.

### Что внутри

- 🌍 **Полностью на двух языках** — мгновенное переключение между русским (кириллица) и сербским (латиница)
- 🍴 **50 классических блюд** — 25 русских (Борщ, Пельмени, Сарма, Медовик…) и 25 сербских (Чевапи, Бурек, Гибаница, Айвар…)
- 📜 **6 полных рецептов** с пошаговыми инструкциями, чекбоксами и таймерами
- 🛒 **Список покупок в виде стильного инвойса** на крафтовой бумаге с перфорацией
- 💰 **Сравнение цен** в трёх сербских сетях магазинов (Maxi, IDEA, Lidl) с автоматическим выделением самого дешёвого
- 📍 **Геолокация** с реальным расчётом расстояний до магазинов (формула Haversine)
- 💱 **Live курс RSD → RUB** через бесплатный API
- 👤 **Профиль пользователя** в стиле журнальной читательской карты
- 🏆 **6 достижений** автоматически разблокируются за реальные действия
- 🗺️ **Открытие маршрута** в Google Maps до выбранного магазина

### Технологии

- **React Native** + **Expo SDK** — кроссплатформенная разработка
- **expo-router** — навигация
- **Context API** — глобальное состояние (язык, курс, локация, избранное)
- **lucide-react-native** — иконки
- **react-native-svg** — декоративные мотивы и штампы
- **expo-location** — определение GPS-координат
- **AsyncStorage** — сохранение настроек между сессиями

### API

| Сервис | Назначение |
|--------|------------|
| `open.er-api.com` | Курс RSD → RUB (бесплатно, без ключа) |
| `api.bigdatacloud.net` | Обратное геокодирование (бесплатно, без ключа) |

### Скриншоты

| Главная | Рецепт | Корзина | Профиль |
|---------|--------|---------|---------|
| Лента из 50 блюд с типографскими обложками | Полный рецепт Сармы с таймерами | Инвойс на крафтовой бумаге со штампом «BEST PRICE» | Карточка читателя с ачивками |

### Статус разработки

🟡 **Прототип** — приложение функционально, но требует доработки контента:

- ✅ Все 4 экрана с полной навигацией
- ✅ Двуязычность с плавным переключением
- ✅ 50 блюд в каталоге
- ✅ Полный рецепт для Сармы (11 ингредиентов, 7 шагов с таймерами)
- 🟡 Полные рецепты для остальных блюд (5 готово, 44 на заглушке «Скоро»)
- ❌ Реальные фотографии блюд (сейчас типографские обложки)
- ❌ Парсинг живых цен из каталогов магазинов
- ❌ Регистрация пользователей и синхронизация избранного

### Концепция и история создания

Проект создан как эксперимент — насколько далеко можно зайти в разработке мобильного приложения с помощью одних только AI-инструментов. От идеи до рабочего прототипа на двух языках с 50 блюдами, тремя магазинами и полностью функциональным экраном рецепта — около двух недель работы с Claude (генерация ТЗ, дизайн-системы, контента) и OnSpace.ai (сборка React Native приложения).

---

## 🇷🇸 Srpska verzija

### O projektu

**TRPEZA** je mobilna aplikacija za Ruse koji žive u Srbiji (i za Srbe koji vole rusku kuhinju). Spaja dve kulinarske tradicije u jednom lepom interfejsu.

Estetika aplikacije je **„gastronomski časopis"** — topla paleta, kraft papir, Playfair Display kurzivom. Ovo nije još jedna food-delivery aplikacija, već digitalna verzija premium kulinarskog izdanja.

### Šta sadrži

- 🌍 **Potpuno dvojezično** — trenutno prebacivanje između ruskog (ćirilica) i srpskog (latinica)
- 🍴 **50 klasičnih jela** — 25 ruskih i 25 srpskih
- 📜 **6 punih recepata** sa korak-po-korak uputstvima, čekboksovima i tajmerima
- 🛒 **Spisak za kupovinu** kao stilski račun na kraft papiru sa perforacijom
- 💰 **Poređenje cena** u tri srpska lanca (Maxi, IDEA, Lidl)
- 📍 **Geolokacija** sa proračunom udaljenosti do prodavnica
- 💱 **Live kurs RSD → RUB**
- 👤 **Korisnički profil** u stilu čitalačke karte
- 🏆 **6 dostignuća** koja se automatski otključavaju
- 🗺️ **Navigacija** do prodavnica preko Google Maps

---

## 🛠 Local Development

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio Emulator (any OS)
- Expo Go app on your phone for live preview

### Setup

```bash
git clone https://github.com/EvilWhiteBear/Trpeza.git
cd Trpeza
npm install
npx expo start
```

Scan the QR code with Expo Go app on your phone, or press `i` for iOS simulator / `a` for Android emulator.

---

## 📜 License

MIT License — see [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this code for any purpose, including commercial. Attribution is appreciated but not required.

---

## 🤝 Contributing

Pull requests welcome. For major changes, please open an issue first to discuss what you'd like to change.

Особенно приветствуются:
- Новые рецепты (свои, не скопированные)
- Переводы и исправления
- Фотографии блюд (свои или с открытой лицензией)
- Улучшения UI/UX

---

## 📬 Contact

Repository: [github.com/EvilWhiteBear/Trpeza](https://github.com/EvilWhiteBear/Trpeza)

---

*Built with ❤️ between Moscow and Belgrade*
