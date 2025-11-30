import { Box, Tabs, Tab, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useAppStore } from '../store/appStore';
import { TABS } from '../lib/constants';
import InformationTab from './InformationTab';
import DemoTab from './DemoTab';
import DiagnosticsTab from './DiagnosticsTab';

export default function TaskView() {
  const { currentTab, setCurrentTab } = useAppStore();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<InfoIcon />}
            label="Information"
            value={TABS.INFORMATION}
            iconPosition="start"
          />
          <Tab
            icon={<PlayArrowIcon />}
            label="Demo"
            value={TABS.DEMO}
            iconPosition="start"
          />
          <Tab
            icon={<BugReportIcon />}
            label="Diagnostics"
            value={TABS.DIAGNOSTICS}
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      <Box>
        {currentTab === TABS.INFORMATION && <InformationTab />}
        {currentTab === TABS.DEMO && <DemoTab />}
        {currentTab === TABS.DIAGNOSTICS && <DiagnosticsTab />}
      </Box>
    </Box>
  );
}
