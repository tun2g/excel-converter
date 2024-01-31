// color design tokens export
export const color = {
    primary: "#fc8019",
    primary_border_color: "#fd9c4b",
    sub_background_color: "#fc8e32",
    white: "#fff",
    background_sale: "#eb5757",
    star_unlike: "#dbdbdb",
    base_border:"#ccced1",
    text_color1: "#757575",
    text_color2:"#CECECE",
    box_shadow: "#b15800",
    completed: "#1FBF75",
    bg_completed: "rgba(227,250,239,0.2)",
    prepared: "#33A9FF",
    bg_prepared:"rgba(235,246,255,0.2)",
    heart:{
      done: "#eb5757",
      un: "#777777"
    },
    rgba_primary: {
      1: "rgba(252,128,25,.1)",
      2: "rgba(252,128,25,.2)",
      3: "rgba(252,128,25,.3)",
      4: "rgba(252,128,25,.4)",
      5: "rgba(252,128,25,.5)",
      6: "rgba(252,128,25,.6)",
      7: "rgba(252,128,25,.7)",
      8: "rgba(252,128,25,.8)",
      9: "rgba(252,128,25,.9)",
    }
  };
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              ...color,
              text_color1: "#CECECE",
              text_color2:"#757575",
              background: "#20203C",
              bill_bg:"transparent",
              bill_detail:"transparent",
            }
          : {
            ...color,
              background: "#fff",
              bill_bg:"rgba(252,128,25,.1)",
              bill_detail:"#fff",
            }),
      },
    };
  };