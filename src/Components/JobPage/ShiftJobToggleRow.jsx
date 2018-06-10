import React from 'react';
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import {withStyles} from 'material-ui/styles';
import Switch from 'material-ui/Switch';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

// https://www.apollographql.com/docs/react/essentials/mutations.html
const ADD_JOB_TO_SHIFT = gql `
  mutation addJobToShift($jobId: String!) {
    addJobToShift(jobId: $jobId) {
      JobId
      JobNumber
      CustomerId
      Added
    }
  }
`;

const GET_JOBS = gql `{ 
  jobs
  {
    JobId
    JobNumber
    CustomerId
    Added
  }
}`

// https://www.apollographql.com/docs/react/essentials/mutations.html
class ShiftJobToggleRow extends React.Component {
  render() {
    const {job, classes} = this.props;
    return (
      <Mutation
        mutation={ADD_JOB_TO_SHIFT}
        update={(cache, {data: {
          addJobToShift
        }}) => {
        const {jobs} = cache.readQuery({query: GET_JOBS});
        cache.writeQuery({
          query: GET_JOBS,
          data: {
            jobs: jobs.concat([addJobToShift])
          }
        });
      }}>
        {(addJobToShift, {data}) => (
          <ListItem
            key={job.JobId}
            button
            onClick={e => {
            e.preventDefault();
            addJobToShift({
              variables: {
                jobId: job.JobId
              }
            });
          }}
            className={classes.listItem}>
            <ListItemText primary={job.JobNumber} secondary={job.CustomerId}/>
            <ListItemSecondaryAction>
              <Switch
                onChange={e => {
                e.preventDefault();
                addJobToShift({
                  variables: {
                    jobId: job.JobId
                  }
                });
              }}
                checked={job.Added}/>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </Mutation>
    );
  };
}

ShiftJobToggleRow.propTypes = {
  job: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default withStyles(styles)(ShiftJobToggleRow);