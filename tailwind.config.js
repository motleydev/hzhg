const defaultVariants = [
  "responsive",
  "group-hover",
  "focus-within",
  "first",
  "last",
  "odd",
  "even",
  "hover",
  "focus",
  "active",
  "visited",
  "disabled"
];

module.exports = {
  theme: {
    fontFamily: {
      display: ["Source Sans Pro", "Verdana"],
      body: ["Open Sans", "Verdana"]
    },
    extend: {
      spacing: {
        half: "50%",
        full: "100%"
      },
      container: {
        center: true,
        padding: "2rem"
      }
    },
    variants: {
      opacity: defaultVariants,
      display: defaultVariants,
      height: defaultVariants,
      textDecoration: defaultVariants
    },
    plugins: []
  }
};
