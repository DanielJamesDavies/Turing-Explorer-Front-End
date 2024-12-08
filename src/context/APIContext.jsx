import React, { createContext, useCallback } from "react";

export const APIContext = createContext();

const APIProvider = ({ children }) => {
	const APIRequest = useCallback(async (path, method, body, stream_function) => {
		let data = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (body) data.body = JSON.stringify(body);

		try {
			const API_URL = import.meta.env.VITE_API_ENDPOINT.replace("http://", "https://") || `http://${window.location?.hostname}:5000/api`;

			if (stream_function !== undefined) {
				fetch(API_URL + path, data)
					.then(async (res) => {
						if (!res.ok) throw new Error(`Network response was not ok: ${res.statusText}`);
						const reader = res.body.getReader();
						const decoder = new TextDecoder("utf-8");
						let chunk = "";
						while (true) {
							const { value, done } = await reader.read();
							chunk += decoder.decode(value, { stream: true });
							try {
								stream_function(JSON.parse(chunk));
							} catch (e) {
								try {
									stream_function(
										JSON.parse(
											chunk
												.split("<|END_OF_RESPONSE_CHUNK_12|>")
												?.slice(0, -1)
												?.filter((e) => e?.length !== 0)
												?.at(-1)
										)
									);
								} catch (e) {}
							}

							if (done) {
								chunk = "";
								break;
							}
						}
					})
					.catch((err) => {
						console.error("Fetch error:", err);
					});
			} else {
				const response = await fetch(API_URL + path, data);
				const responseData = await response.json();
				return responseData;
			}
		} catch (e) {
			return { errors: [{ message: "Failed to Send Request to Server" }] };
		}
	}, []);

	return <APIContext.Provider value={{ APIRequest }}>{children}</APIContext.Provider>;
};

export default APIProvider;
