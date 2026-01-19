export const Logo = () => {
  return (
    <svg
      width={"100%"}
      height={57}
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n      @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@1,700&display=swap');\n      .logo-text {\n        font-family: 'Inter', sans-serif;\n        font-style: italic;\n        font-weight: 700;\n        font-size: 42px;\n        letter-spacing: -1px;\n      }\n    ",
          }}
        />
      </defs>
      <text x={"50%"} y={45} className="logo-text" textAnchor="middle">
        <tspan fill="#FFFFFF">HM</tspan>
        <tspan fill="#20B2AA">H</tspan>
        <tspan fill="#D1D5DB">Y</tspan>
      </text>
    </svg>
  );
};
