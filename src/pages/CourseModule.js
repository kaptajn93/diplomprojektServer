import React from 'react'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import CourseModuleInfo from '../components/CourseModuleInfo';

const style = {
  margin: '30px 50px'
};

const CourseModule = () => (
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <Card>
          <CardHeader
            title="Modul 1/12"
            subtitle="Fyret. Hvad nu?"
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardText expandable={false}>
            <Tabs>
              <Tab
                icon={<FontIcon className="material-icons">wb_incandescent</FontIcon>}
                label="VIDEN">
                <div>
                  <CourseModuleInfo />
                </div>
              </Tab>
              <Tab
                icon={<FontIcon className="material-icons">colorize</FontIcon>}
                label="EKSPERIMENT"
              />
              <Tab
                icon={<FontIcon className="material-icons">cloud</FontIcon>}
                label="REFLEKTION"
              />
            </Tabs>
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Forrige"/>
            <FlatButton label="Næste"/>
          </CardActions>
        </Card>
      </div>
    </div>
  </div>
)

export default CourseModule
