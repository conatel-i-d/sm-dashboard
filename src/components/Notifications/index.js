import React from 'react';

import { BellIcon } from '@patternfly/react-icons';
import { NotificationBadge } from '@patternfly/react-core';

const Notifications = ({ isRead = false }) => {
  return (
    <React.Fragment>
      <NotificationBadge isRead={isRead} aria-label="Notifications">
        <BellIcon />
      </NotificationBadge>
    </React.Fragment>
  );
};

export default Notifications;
