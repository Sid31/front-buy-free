/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          card: "#111111",
          darker: "#000000",
        },
        card: {
          DEFAULT: "rgba(17, 17, 17, 0.7)",
          darker: "rgba(15, 15, 15, 0.8)",
          border: "rgba(30, 30, 30, 0.2)",
        },
        accent: {
          green: {
            DEFAULT: "#1FE365",
            dark: "#189E4B",
            light: "#25FF7B",
          },
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          success: "#1FE365",
          muted: "rgba(255, 255, 255, 0.7)",
        },
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.2)",
        glow: "0 0 20px rgba(31, 227, 101, 0.15)",
        input: "0 2px 4px rgba(0, 0, 0, 0.2) inset",
      },
      backgroundImage: {
        "gradient-dark":
          "radial-gradient(circle at top, rgba(17, 17, 17, 0.15), rgba(0, 0, 0, 0.8) 50%)",
        "gradient-card":
          "linear-gradient(180deg, rgba(17, 17, 17, 0.7) 0%, rgba(15, 15, 15, 0.8) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
