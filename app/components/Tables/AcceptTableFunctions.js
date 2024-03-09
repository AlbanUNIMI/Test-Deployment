import React from 'react';
import { makeStyles } from 'tss-react/mui';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const useStyles = makeStyles()((theme) => ({
    root: {
      width: '100%',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    tabs: {
      backgroundColor: '#f5f5f5',
      borderRadius: 0
    },

    accordionSummary: {
      backgroundColor: '#f5f5f5',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      justifyContent: 'center'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: '100%',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    actionButtons: {
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      height: '10vh',
      width: '100%',
      textAlign: 'center',
      color: 'black'
    }
  }));

export const EnhancedTableHead = (props) => {

    const { classes } = useStyles();

    const headCells = [{
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: '',
      }, {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name'
      }, {
        id: 'location',
        numeric: true,
        disablePadding: false,
        label: 'Location'
      },{
        id: 'buttons',
        numeric: false,
        disablePadding: false,
        label: '',
        }];

    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
  
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : 'desc'}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'desc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  