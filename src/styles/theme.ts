import { COLORS } from "@constants/colors";
import { ITheme } from "@constants/theme";
import { Mode } from "@contexts/ThemeContext";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h5_bold: React.CSSProperties;
    h5_medium: React.CSSProperties;
    h6_medium: React.CSSProperties;
    h4_bold: React.CSSProperties;
    h2_bold: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h5_bold?: React.CSSProperties;
    h5_medium?: React.CSSProperties;
    h6_medium?: React.CSSProperties;
    h4_bold?: React.CSSProperties;
    h2_bold?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h5_bold: true;
    h5_medium: true;
    h6_medium: true;
    h4_bold: true;
    h2_bold: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    rounded: true;
  }
}

export const getMuiTheme = (mode: Mode, colors: ITheme) => {
  let theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: COLORS.PRIMARY.main,
      },
    },
    typography: {
      fontFamily: ["Manrope", "sans-serif"].join(","),
      h2_bold: {
        fontWeight: 700,
        fontSize: "25px",
      },
      h4: {
        fontWeight: 400,
        fontSize: "18px",
      },
      h4_bold: {
        fontWeight: 700,
        fontSize: "18px",
        display: "block",
      },
      h5: {
        fontWeight: 400,
        fontSize: "16px",
      },
      h5_medium: {
        fontWeight: 500,
        fontSize: "16px",
        display: "block",
      },
      h5_bold: {
        fontWeight: 700,
        fontSize: "16px",
        display: "block",
      },
      h6_medium: {
        fontWeight: 500,
        fontSize: "14px",
        display: "block",
      },
    },
  });

  theme = {
    ...theme,
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 300,
            "::-webkit-scrollbar": {
              display: "none !important",
            },
            borderRight: `1px solid ${colors.text}`,
            "& .MuiListItem-root": {
              padding: "10px 0px 0px 0px",
              "& .MuiListItemButton-root": {
                paddingTop: "15px",
                paddingBottom: "15px",
                color: colors.text,
                "& .MuiListItemText-root": {
                  margin: "0px 20px",
                  "& .MuiTypography-root": {
                    color: COLORS.BLACK.main,
                    fontSize: "23px",
                    fontWeight: 800,
                  },
                },
                "&:hover": {
                  background: COLORS.WHITE.main,
                },
              },
              "& .MuiListItemButton-root.Mui-selected": {
                background: COLORS.PRIMARY.main,
                // borderRight: `4px solid ${COLORS.PRIMARY.hard}`,
              },
            },
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
          },
          contained: {
            fontWeight: 700,
            fontSize: "16px",
            boxShadow: "none",
            padding: "15px 20px",
            color: COLORS.WHITE.main,
            backgroundColor: COLORS.PRIMARY.main,
            "&:active": {
              boxShadow: "none",
            },
            "&:hover": {
              backgroundColor: COLORS.PRIMARY.main,
            },
          },
          outlined: {
            fontWeight: 700,
            fontSize: "16px",
            padding: "3px 10px",
            border: `2px solid ${COLORS.PRIMARY.main}`,
            "&.MuiButton-inActive": {
              color: COLORS.PRIMARY.main,
              border: `2px solid ${COLORS.PRIMARY.main}`,
            },
          },
        },
        variants: [
          {
            props: { variant: "rounded" },
            style: {
              borderRadius: "35px",
              fontWeight: 700,
              fontSize: "16px",
              boxShadow: "none",
              padding: "15px 50px",
              color: COLORS.WHITE.main,
              backgroundColor: COLORS.PRIMARY.main,
              "&:active": {
                boxShadow: "none",
              },
              "&:hover": {
                backgroundColor: COLORS.PRIMARY.main,
              },
            },
          },
        ],
      },

      MuiInput: {
        styleOverrides: {
          underline: {
            "&:before": {
              borderBottom: "none",
            },
            "&:after": {
              borderBottom: "none",
            },
          },
          input: {
            borderRadius: 8,
            padding: "15px",
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: "18px",
            fontWeight: 600,
            "& input::placeholder": {
              color: COLORS.BLACK.main,
              opacity: 1,
            },
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            "&.MuiTab-users-menu": {
              display: "flex",
              fontSize: "16px",
              fontWeight: "700",
              padding: "10px 60px",
              textTransform: "none",
              color: COLORS.PRIMARY.main,
              borderBottom: `2px solid ${COLORS.BLACK.main}`,
            },
          },
        },
      },

      MuiTable: {
        styleOverrides: {
          root: {
            "&.user__table": {
              "& .MuiTableHead-root": {
                "& .MuiTableCell-root": {
                  fontWeight: 700,
                  fontSize: "16px",
                },
              },

              "& .MuiTableBody-root": {
                "& .MuiTableCell-root": {
                  fontWeight: 500,
                  fontSize: "18px",
                },
                "& .MuiTypography-root": {
                  fontWeight: 500,
                  fontSize: "18px",
                },
              },
            },
          },
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: {
            color: colors.text,
            "&.content__title": {
              color: COLORS.PRIMARY.main,
              fontSize: "18px",
              fontWeight: 700,
              textAlign: "center",
            },
          },
        },
      },

      MuiGrid: {
        styleOverrides: {
          item: {
            "&.content__card": {
              background: COLORS.WHITE.main,
              borderRadius: "24px",
              padding: "4px 12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          },
        },
      },
    },
  };

  return theme;
};
