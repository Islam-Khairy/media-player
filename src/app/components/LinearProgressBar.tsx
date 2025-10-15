import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LinearProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant='determinate'
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: '#e5e7eb',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            backgroundColor:'#10b981',
            transition: 'all 0.3s ease',
          },
        }}
      />
    </Box>
  );
};

export default LinearProgressBar;