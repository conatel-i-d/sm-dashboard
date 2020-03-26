import React from 'react';
import { Button, Modal as PatternflyModal } from '@patternfly/react-core';
import { history } from '../../modules/history.js';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

function NicsModal({ isOpen, onClose, mac_entries }) {
  return (
    <PatternflyModal
      isSmall
      title="Macs"
      isOpen={isOpen}
      onClose={() => onClose()}
      actions={[
        <Button key="cancel" variant="link" onClick={() => onClose()}>
          Close
        </Button>
      ]}
      isFooterLeftAligned
    >
      <Table aria-label="Macs Table" rows={mac_entries.split(',').map(entry => [ entry ])} cells={['Macs']}>
        <TableHeader hidden={true} />
        <TableBody />
      </Table>
    </PatternflyModal>
  );
}

export function onClose(id) {
  history.push(`/switches/${id}`);
}

export default NicsModal;
