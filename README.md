# Clothes


# Przegląd ogólny aplikacji

**Fashionova** to kompleksowa internetowa baza zdjęć, która oferuje szeroki wybór modnych ubrań zaspokajających wszystkie zainteresowania. Dzięki **Fashionova** możesz łatwo obserwować, wyszukiwać i dodawać swoje ulubione ubrania oraz odpowiednio je ocenić poprzez reakcję.

## Funkcje i opis działania aplikacji

1. **Rejestracja użytkownika** – Każda osoba jest w stanie założyć swoje konto użytkownika w formularzu rejestracyjnym uzupełniając swoje dane o nazwę użytkownika, email oraz hasło, które zostanie zabezpieczone hashowaniem.
   - Nawigacja do strony logowania w przypadku, gdy użytkownik posiada już utworzone konto.
   - Poinformowanie użytkownika w przypadku, gdy użytkownik wpisał już istniejącą nazwę użytkownika w formularzu rejestracyjnym.

2. **Logowanie użytkownika** – Każdy osoba, która założyła swoje konto na stronie rejestracyjnej, może już zalogować się w formularzu logowania wpisując swoją nazwę użytkownika oraz hasło.
   - Nawigacja do strony rejestracyjnej w przypadku, gdy użytkownik nie posiada jeszcze utworzonego konta.
   - Poinformowanie użytkownika w przypadku, gdy użytkownik wpisał niepoprawną nazwę użytkownika lub hasło w formularzu logowania.

3. **Strona główna** – Po sukcesywnym zalogowaniu, użytkownik zostaje przekierowany na stronę główną. Zostaje przypisany mu JWT token (access_token – token dostępu), aby utrzymać go w sesji autentykacji, gdyż tylko zalogowany użytkownik ma dostęp do:
   - Formularza dodawania modnych zdjęć ubrań wraz z tytułem oraz opisem.
   - Wyświetlania dodanych przez siebie lub innych użytkowników zdjęć, tytułu oraz opisu.
   - Możliwości dodania reakcji, czyli oceny każdego zdjęcia poprzez like lub dislike. Każdy użytkownik ma limit 1 reakcji na 1 zdjęcie.
   - Wyświetlania swojego awataru.
   - Możliwości wyszukania konkretnego zdjęcia po tytule za pomocą paska wyszukiwania.
   - Możliwość wylogowania się z konta.
   - Możliwość przejścia na stronę profilową.

4. **Strona profilowa** – Gdy użytkownik zostanie przekierowany ze strony głównej na stronę profilową, to dzięki podtrzymaniu sesji autentykacji za pomocą tokenu dostępu uzyskuje dostęp do:
   - Formularza uzupełniającego dane osobowe zalogowanego użytkownika, takie jak imię, nazwisko, informacja personalna, adres zamieszkania, numer telefonu oraz awatar użytkownika.
   - Możliwości zapisania i wyświetlania dodanych danych.
   - Możliwość przejścia do strony głównej (zapisany awatar będzie się tam również wyświetlał).

## Użyte technologie

- Django 4.2.6
- Python 3.10.7
- React.js
- PostgreSQL database
- HTML
- CSS

## Usługi zewnętrzne

- Font Awesome
- Axios

## Instalacja

### Sklonuj projekt

```git
git clone https://github.com/SebastianDev10/Clothes.git
```

### Po sklonowaniu repozytorium, przejdź do folderu backendowego:

```bash
cd myproject
```

### Zainstaluj zależności i aktywuj środowisko wirtualne

unix / mac

``` python
python3 -m pip install --user virtualenv
```

windows

```python
py -m pip install --user virtualenv
```

utwórz środowisko wirtualne

unix / mac

```python
python3 -m venv env
```

windows

```pyhton
py -m venv env
```

Zainstaluj potrzebne zależności:

unix / mac

``` python
python3 -m pip install -r requirements.txt
```

windows

```python
py -m pip install -r requirements.txt
```

Zainstaluj pakiet, który ułatwi obsługę uploadu mediów:

```python
pip install Pillow
```

### Skonfiguruj ustawienia połączenia z bazą danych:

Edytuj `settings.py` i zmień ustawienia dla bazy danych, a następnie przeprowadź migracje bazy danych:


``` python
python manage.py makemigrations
```

``` python
python manage.py migrate
```

### Uruchom serwer Django:

``` python
python manage.py runserver
```

### Po uruchomieniu części backendowej, przejdz do folderu z częścią frontendową:

```bash
cd myapp
```
Zainstaluj potrzebne zależności:

``` javascript
npm install
```

``` javascript
npm install react-router-dom@5.2
```

``` javascript
npm install axios
```

Uruchom aplikację React.js:

``` javascript
npm start
```

Aplikacja powinna automatycznie otworzyć się w przeglądarce pod adresem http://localhost:3000.

##Wybór frameworków

###Frontend: React.js

- **Integracja z JWT i AJAX:** React dało się łatwo integrować się z technologią taką jak JWT dla autentykacji użytkownika i AJAX (wykorzystując bibliotekę axios) do komunikacji z backendem, co było kluczowe dla funkcjonalności takich jak rejestracja, logowanie i dynamiczne ładowanie zawartości
- **Popularność i Zasoby:** React jest bardzo popularnym narzędziem, cechuje go duża dostępność zasobów oraz duża społeczność, dlatego łatwiej było dotrzeć do materiałów edukacyjnych, bibliotek, komponentów, ikon, co przyspieszyło rozwój aplikacji
- **Wsparcie dla SPA:** React ma wsparcie dla Single Page Applications (SPA), czyli moja aplikacja ładuje się dosyć szybko, a interakcja z użytkownikiem jest płynna, np. nie trzeba przeładowywać strony podczas gdy użytkownik używa paska wyszukiwania, tak samo dane dodawane przez formularz nie wymagają odświeżenia strony, aby zostały zapisane i uwidocznione

###Backend: Django

- **Rozbudowane Funkcjonalności:** Django jest bardzo rozbudowanym frameworkiem backendowym, gdyż posiada wiele wbudowanych funkcjonalności takich jak np. gotowy model użytkownika, ORM, co przyspiesza rozwój pisania kodu
- **Bezpieczeństwo:** Ochrona przed atakami, takimi jak SQL injection.
- **Skalowalność i Wydajność:** Cechuje się skalowalnością oraz wydajnością, co jest ważne dla aplikacji, która posiada bazę użytkowników, zapisanych obrazów 
- **Wsparcie dla REST API i Integracja z Reactem:** Wspiera REST API i integruje się z Reactem. Jest potężnym narzędziem do tworzenia API, które można w łatwy sposób połączyć z frontendem. Pozwala to na płynną komunikację między frontendem a backendem.
- **Obsługa i Zarządzanie Multimediami:** Jest to istotne dla mojej aplikacji, która musi umożliwiać użytkownikom dodawanie zdjęć ubrań oraz zdjęcia profilowego (awataru)

##Uzasadnienie Doboru Architektury

###Backend: Architektura oparta na RESTful API

- Ta architektura służy jako serwerowy punkty końcowy dla zapytań HTTP
- Umożliwia łatwą komunikację między frontendem a backendem przy użyciu metod http (GET, POST)
- Ułatwiona jest implementacja autentykacji i autoryzacji, co zwiększa bezpieczeństwo ochrony danych i zapewnia, że uprawnieni użytkownicy mają dostęp do określonych zasobów
- Wyraźnie oddzielona jest logika biznesowa od interfejsu użytkownika
- Modularna struktura, która zapewnia czystość kodu, ułatwia rozwój aplikacji – podział na pliki widoku (views.py,  gdzie znajduje się logika biznesowa i obsługa żądań http, integracja z serializerami i modelami, tworzenie spójnego i wydajnego interfejsu API), definicja struktury danych (models.py, gdzie zdefiniowane są modele struktury bazy danych. Modele wykorzystują ORM, który umożliwia interakcje z bazą danych w obiektowy sposób) oraz pliki konwersji danych (serializers.py, gdzie są zawarte definicje serializerów, które są odpowiedzialne za przekształcanie danych między formatem JSON, używanym w komunikacji API, a formatem dla modeli Django)

###Frontend: Architektura oparta na Single Page Application (SPA) 

- Interaktywny i Dynamiczny Interfejs Użytkownika – SPA umożliwia tworzenie płynnego i dynamicznego interfejsu użytkownika, bez konieczności przeładowania całej strony (np. wykorzystanie hooków stanu takoich jak useState, useEffect, użycie nawigacji, która umożliwia przełączanie między różnymi widokami bez odświeżania strony)
- Komunikacja z backendem – większość danych jest pobierana i wysyłana do serwera w tle
- Zarządzenia autentykacją – decydowanie o dostępie do poszczególnych ścieżek na podstawie tokena przechowywanego w localStorage

Podsumowując, połączenie obu tych architektur, umożliwiło wyraźne oddzielenie logiki biznesowej, przetwarzania danych i interakcji z bazą danych (backend) od prezentacji tych danych i interakcji z użytkownikiem (frontend).


