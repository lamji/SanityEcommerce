const useStyles = () => {
  return {
    summaryCard: {
      height: '100%',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
      }
    },

    iconWrapper: {
      padding: '1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px'
    },

    chartContainer: {
      position: 'relative',
      height: '100%',
      minHeight: '400px',
      width: '100%',
      '& canvas': {
        width: '100% !important',
        height: '100% !important'
      }
    },

    progressBarContainer: {
      marginBottom: '1.5rem'
    },

    progressLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
      fontSize: '0.875rem'
    },

    progress: {
      height: '8px',
      borderRadius: '4px'
    },

    ordersTable: {
      '& th': {
        fontWeight: 600,
        backgroundColor: '#f8f9fa'
      },
      '& td': {
        verticalAlign: 'middle'
      }
    },

    statusBadge: {
      padding: '0.5em 0.75em',
      fontWeight: 500,
      borderRadius: '4px'
    },

    trendIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.875rem'
    },

    trendPositive: {
      color: 'var(--bs-success)'
    },

    trendNegative: {
      color: 'var(--bs-danger)'
    },

    cardTitle: {
      fontWeight: 600,
      color: 'var(--bs-gray-700)',
      marginBottom: '1rem'
    },

    tableResponsive: {
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        height: '8px'
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'var(--primary-color)',
        borderRadius: '4px',
        '&:hover': {
          opacity: 0.8
        }
      }
    },

    cardBody: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },

    cardContent: {
      flex: 1,
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '4px'
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'var(--primary-color)',
        borderRadius: '4px',
        '&:hover': {
          opacity: 0.8
        }
      }
    },

    card: {
      border: 'none',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      height: '100%',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
      }
    },

    dashboardWrapper: {
      padding: '1rem',
      '@media (max-width: 768px)': {
        padding: '0.5rem'
      }
    },

    statusRow: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      backgroundColor: 'var(--bs-gray-100)',
      padding: '5px',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'
    }
  };
};

export default useStyles; 