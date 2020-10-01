import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import AccordionQuiz from '../AccordionQuiz';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  }
}));

const Stepper = ({ maxSteps, data }) => {
  console.log(maxSteps, data)
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <AccordionQuiz 
        question={data[activeStep].question} 
        answer={data[activeStep].answer} 
      /> 
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleNext} 
            endIcon={<SkipNextIcon/>}
            disabled={activeStep === maxSteps - 1}
          >
            Siguiente 
          </Button>
        }
        backButton={
          <Button 
            variant="contained"
            color="secondary" 
            startIcon={<SkipPreviousIcon />}
            onClick={handleBack} 
            disabled={activeStep === 0}
          >
            Anterior
          </Button>
        }
      />
    </div>
  );
}

export default Stepper;

