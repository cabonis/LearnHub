import { useState, useEffect } from 'react';
import { Typography, } from "@mui/material";
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ClearableTextBox from "./ClearableTextBox";


export default function SearchableTransferList({ leftTitle, leftData, rightTitle, rightData, dataChanged, getId, getValue }) {

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([...leftData]);
  const [right, setRight] = useState([...rightData]);
  const [leftFilter, setLeftFilter] = useState('');
  const [rightFilter, setRightFilter] = useState('');

  useEffect(() => {
    dataChanged(left, right);
  }, [left, right]);

  useEffect(() => {
    setRight(rightData);
  }, [rightData]);

  useEffect(() => {
    setLeft(leftData);
  }, [leftData]);

  const not = (a, b) => {
    return a.filter((value) => !b.some((item) => getId(item) === getId(value)));
  }

  const intersection = (a, b) => {
    return a.filter((value) => b.some((item) => getId(item) === getId(value)));
  }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const filter = (values, filter) => {
    return values.filter((value) => getValue(value).toUpperCase().includes(filter.toUpperCase()))
  };

  const compare = (a, b) => {
    const itemA = getValue(a).toUpperCase();
    const itemB = getValue(b).toUpperCase();
    if (itemA < itemB)
      return -1;
    if (itemA > itemB)
      return 1;
    return 0;
  };

  const leftFiltered = filter(left, leftFilter).sort(compare);
  const rightFiltered = filter(right, rightFilter).sort(compare);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (items) => (
    <Paper sx={{ width: 225, height: 400, overflow: 'auto', backgroundColor: 'primary.light' }}>
      <List dense component="div" role="list">
        {items.map((value) => {

          const id = getId(value);
          const labelId = `transfer-list-item-${id}-label`;

          return (
            <Box key={id}>
              <ListItemButton
                key={id}
                role="listitem"
                onClick={handleToggle(value)}
                sx={{ pt: 0, pb: 0, pl: 1 }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.includes(value)}
                    sx={{
                      m: 0,
                      [`&, &.${checkboxClasses.checked}`]: {
                        color: 'secondary.main',
                      },
                    }}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${getValue(value)}`} />
              </ListItemButton>
              <Divider component="li" />
            </Box>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Stack>

      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid size={5}>
          <Typography variant='h5' sx={{ p: 1 }}>{leftTitle}</Typography>
        </Grid>
        <Grid size={2}></Grid>
        <Grid size={5}>
          <Typography variant='h5' sx={{ p: 1 }}>{rightTitle}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid size={5}>
          {customList(leftFiltered)}
        </Grid>
        <Grid size={2}>
          <Grid container direction="column" sx={{ alignItems: 'center' }}>
            <Button
              sx={{ my: 0.5 }}
              variant="contained"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
              color="secondary"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="contained"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
              color="secondary"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid size={5}>
          {customList(rightFiltered)}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid size={5}>
          <ClearableTextBox label="Filter" onValueChange={(value) => setLeftFilter(value)} />
        </Grid>
        <Grid size={2}></Grid>
        <Grid size={5}>
          <ClearableTextBox label="Filter" onValueChange={(value) => setRightFilter(value)} />
        </Grid>
      </Grid>

    </Stack>
  );
}
