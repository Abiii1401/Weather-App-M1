# Weather App 🌤️

A modern weather application built with React and Vite that provides real-time weather information for any location. The app features a beautiful UI with dynamic backgrounds based on weather conditions, temperature conversion, and detailed weather metrics.

## Features ✨

- Real-time weather data using OpenWeatherMap API
- Location search with autocomplete suggestions
- Temperature conversion between Celsius and Fahrenheit
- Detailed weather metrics:
  - Temperature
  - Humidity
  - Wind speed and direction
  - Visibility
  - Sunrise and sunset times
- Dynamic background based on weather conditions
- Responsive design for all devices
- Modern UI with glassmorphism effects

## Prerequisites 📋

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- OpenWeatherMap API key

## Setup 🚀

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd Weather-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Building for Production 🏗️

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Deployment to Netlify 🚀

### Method 1: Using Netlify CLI

1. Install Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:

   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   ```

### Method 2: Using Netlify UI

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Netlify](https://app.netlify.com/) and click "New site from Git"

3. Choose your repository and configure the build settings:

   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable:
     - Key: `VITE_WEATHER_API_KEY`
     - Value: Your OpenWeatherMap API key

4. Click "Deploy site"

## Environment Variables 🔑

Create a `.env` file in the root directory with the following variables:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

## Project Structure 📁

```
Weather-App/
├── src/
│   ├── components/
│   │   ├── Icon.jsx
│   │   ├── Helper.jsx
│   │   └── WeatherBackground.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## Technologies Used 🛠️

- React
- Vite
- TailwindCSS
- OpenWeatherMap API
- React Icons

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
