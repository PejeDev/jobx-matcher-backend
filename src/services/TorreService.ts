import axios, { AxiosInstance } from 'axios';
import { ApiConfig } from '../config/index';

class TorreService {
	private searchClient: AxiosInstance;

	private torreClient: AxiosInstance;

	constructor() {
		this.searchClient = axios.create({
			baseURL: `${ApiConfig.torreSearchApi}`,
			withCredentials: true
		});

		this.torreClient = axios.create({
			baseURL: `${ApiConfig.torreApi}`,
			withCredentials: true
		});
	}

	public async jobSearch(offset: number, user: string) {
		const response = await this.searchClient.post(
			`/opportunities/_search/?offset=${offset}&size=20&aggregate=false`,
			{
				bestfor: {
					username: user
				}
			}
		);
		return response.data;
	}

	public async getJobInfo(id: String) {
		const response = await this.torreClient.get(`/api/opportunities/${id}`);
		return response.data;
	}

	public async getBioInfo(user: String) {
		try {
			const response = await this.torreClient.get(`/api/genome/bios/${user}`);
			return response.data;
		} catch (error) {
			if (error.response.status === 404) {
				throw new Error("The Torre account doesn't exists!");
			}
			throw error;
		}
	}
}

export default new TorreService();
