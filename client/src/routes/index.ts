import AddTaskIcon from '@mui/icons-material/AddTask';
import BugReportIcon from '@mui/icons-material/BugReport';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import TerrainIcon from '@mui/icons-material/Terrain';

import asyncComponentLoader from '@/utils/loader';

import { Routes } from './types';

const routes: Routes = [
  {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/RiskAnalysis')),
    path: '/RiskAnalysis',
    title: 'Risk Analysis',
    icon: GitHubIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Reports')),
    path: '/Reports',
    title: 'Reports',
    icon: AddTaskIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/VoiceSession')),
    path: '/VoiceSession',
    title: 'Voice Session',
    icon: TerrainIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Settings')),
    path: '/Settings',
    title: 'Settings',
    icon: BugReportIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
];

export default routes;
