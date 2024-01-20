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
