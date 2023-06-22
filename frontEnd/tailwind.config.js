/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        desktop: "1280px",
        laptop: "1024px",
        tablet: "768px",
        mediumPhone: "640px",
        smallPhone: "480px",
      },
      colors: {
        primary: "#d70018",
      },
      backgroundColor: {
        headerBanner: "#e9efff",
      },
      textColor: {
        primary: "#d70018",
        success: "#58e55b",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
});
