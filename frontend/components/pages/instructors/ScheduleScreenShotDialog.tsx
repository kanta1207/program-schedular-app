import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export interface ScheduleScreenShotDialogProps {
  dialogOpen: boolean;
  image: string;
  onClose: () => void;
  handleDownload: (downloadScreenshotProps: DownloadScreenshotValues) => void;
}

export interface DownloadScreenshotValues {
  extension: string;
  name: string;
}

export const filterKey = 'scheduleFilters';

const ScheduleScreenShotDialog: React.FC<ScheduleScreenShotDialogProps> = ({
  dialogOpen,
  image,
  onClose,
  handleDownload,
}) => {
  const { handleSubmit } = useForm<DownloadScreenshotValues>({
    defaultValues: {
      extension: 'jpeg',
      name: 'schedule',
    },
  });

  const onSubmit: SubmitHandler<DownloadScreenshotValues> = async (data) => {
    try {
      const payload = {
        extension: data.extension,
        name: data.name,
      };
      handleDownload(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <Dialog open={dialogOpen} onClose={onClose} fullWidth maxWidth="sm">
        <Box sx={{ padding: '1rem' }}>
          <DialogTitle sx={{ padding: 'unset' }}>Screenshot Success!</DialogTitle>
          <DialogContent
            sx={{
              padding: 'unset',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              '& > div': { padding: '1rem', width: '100%' },
            }}
          >
            <Box>
              <img src={image} alt="screenshot" style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Box>
              <Typography variant="body1">Select the file format and name for your screenshot.</Typography>
              {/* <Controller
                name="extension"
                render={({ field }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="JPEG"
                      value="jpeg"
                      checked={field.value === 'jpeg'}
                    />
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="PNG"
                      value="png"
                      checked={field.value === 'png'}
                    />
                  </FormGroup>
                )}
              /> */}
              {/* <Controller name="name" render={({ field }) => <Button variant="outlined">Change Name</Button>} /> */}
            </Box>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', gap: '1rem' }}>
            <Button variant="outlined" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
              Download
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </form>
  );
};

export default ScheduleScreenShotDialog;
