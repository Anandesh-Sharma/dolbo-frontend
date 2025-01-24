import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { 
  teamsState, 
  selectedTeamIdState, 
  teamsLoadingState, 
  teamsInitializedState 
} from './store/teams';
import { getAPIUrl } from './utils/api';
import { API_TOKEN } from './envs';
import AppRoutes from './AppRoutes';

export default function AppInitializer() {
  const setTeams = useSetRecoilState(teamsState);
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdState);
  const setIsLoading = useSetRecoilState(teamsLoadingState);
  const setIsInitialized = useSetRecoilState(teamsInitializedState);

  useEffect(() => {
    async function initializeTeams() {
      try {
        const response = await fetch(getAPIUrl('/teams/list'), {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json',
            "ngrok-skip-browser-warning": "69420"
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
        setTeams(data);
        
        if (data.length > 0) {
          setSelectedTeamId(data[0].id);
        }
      } catch (error) {
        console.error('Error initializing teams:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    }

    initializeTeams();
  }, [setTeams, setSelectedTeamId, setIsLoading, setIsInitialized]);

  return <AppRoutes />;
} 