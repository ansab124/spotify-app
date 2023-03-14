import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../redux/axiosInstance";
import Playlist from "../../components/Playlist";
import styles from "./styles.module.scss";

const Home = () => {
	const [firstPlaylists, setFirstPlaylists] = useState([]);
	const [secondPlaylists, setSecondPlaylists] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const getRandomPlaylists = async () => {
		try {

			setIsFetching(true);
			// const url = process.env.REACT_APP_API_URL + "/playlists/random";
			const url = "http://localhost:8080/api/playlists/random"
			const songsUrl = "http://localhost:8080/api/songs"

			const { data } = await axiosInstance.get(url);
			const api = await axiosInstance.get(songsUrl);

			console.log("API-----", api.data)
			const array1 = data.data;
			const array2 = api.data.data;
			// const array2 = api.data.data.splice(0, 4);
			setFirstPlaylists(array1);
			setSecondPlaylists(array2);
			setIsFetching(false);
		} catch (error) {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		getRandomPlaylists();
	}, []);

	return (
		<Fragment>
			{isFetching ? (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			) : (
				<div className={styles.container}>
					<h1>Good afternoon</h1>
					<div className={styles.playlists_container}>
						<Playlist playlists={firstPlaylists} />
					</div>
					<h1>Just the hits</h1>
					<div className={styles.playlists_container}>
						<Playlist playlists={secondPlaylists} />
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Home;
