import { TorreService as api, TorreService } from './index';

class UserService {
	private apiClient: typeof TorreService;
	// TODO: Migrate logic from Controller to service

	constructor() {
		this.apiClient = api;
	}
}

export default new UserService();
