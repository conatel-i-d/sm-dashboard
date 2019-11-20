import React from 'react';
import {
  TextVariants,
  TextContent,
  Text,
  Split,
  SplitItem
} from '@patternfly/react-core';

function SwitchDetails({ model }) {
  return (
    <Split gutter="sm">
      <SplitItem>
        <TextContent>
          <Text component={TextVariants.h5}>Nombre:</Text>
        </TextContent>
      </SplitItem>
      <SplitItem isFilled>
        <Text>{model.name}</Text>
      </SplitItem>
      <SplitItem>
        <TextContent>
          <Text component={TextVariants.h5}>Modelo:</Text>
        </TextContent>
      </SplitItem>
      <SplitItem isFilled>
        <Text>{model.model}</Text>
      </SplitItem>
      <SplitItem>
        <TextContent>
          <Text component={TextVariants.h5}>Descripción:</Text>
        </TextContent>
      </SplitItem>
      <SplitItem isFilled>
        <Text>{model.description}</Text>
      </SplitItem>
      <SplitItem>
        <TextContent>
          <Text component={TextVariants.h5}>IP:</Text>
        </TextContent>
      </SplitItem>
      <SplitItem isFilled>
        <Text>{model.ip}</Text>
      </SplitItem>
    </Split>
  );
}

export default SwitchDetails;
