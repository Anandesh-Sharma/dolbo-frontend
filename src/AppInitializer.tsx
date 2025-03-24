import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import 'nprogress/nprogress.css';
import { 
  teamsState, 
  selectedTeamIdState, 
  teamsLoadingState, 
  teamsInitializedState 
} from './store/teams';
import { getAPIUrl } from './utils/api';
import { authTokenState } from './store/auth';
import AppRoutes from './AppRoutes';

export default function AppInitializer() {
  const setTeams = useSetRecoilState(teamsState);
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdState);
  const setIsLoading = useSetRecoilState(teamsLoadingState);
  const setIsInitialized = useSetRecoilState(teamsInitializedState);
  const authToken = useRecoilValue(authTokenState);

  useEffect(() => {
    async function initializeTeams() {
      try {
        const response = await fetch(getAPIUrl('/teams/list'), {
          headers: {
            Authorization: `Bearer ${authToken?.access_token}`,
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

    if (authToken?.access_token) {
      initializeTeams();
    }
  }, [setTeams, setSelectedTeamId, setIsLoading, setIsInitialized, authToken]);

  return <AppRoutes />;
} 