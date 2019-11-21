import React from 'react';
import { connect } from 'react-redux';
import {
  TextVariants,
  TextContent,
  Text,
  Flex,
  FlexItem
} from '@patternfly/react-core';

import { selectModel } from '../../state/switches';

function SwitchDetails({ model }) {
  return (
    <Flex gutter="sm"
      breakpointMods={[{modifier: "justify-content-space-between"}]}
    >
      <FlexItem>
        <TextContent>
          <Text component={TextVariants.h5}><b>Nombre:</b> {model.name}</Text>
        </TextContent>
      </FlexItem>
      <FlexItem>
        <TextContent>
          <Text component={TextVariants.h5}><b>Modelo</b>: {model.model}</Text>
        </TextContent>
      </FlexItem>
      <FlexItem>
        <TextContent>
          <Text component={TextVariants.h5}><b>Descripción</b>: {model.description}</Text>
        </TextContent>
      </FlexItem>
      <FlexItem>
        <TextContent>
          <Text component={TextVariants.h5}><b>IP</b>: {model.ip}</Text>
        </TextContent>
      </FlexItem>
    </Flex>
  );
}

export default connect(selectModel)(SwitchDetails);
