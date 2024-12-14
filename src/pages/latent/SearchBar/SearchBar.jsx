// Packages

// Components

// Logic
import { SearchBarLogic } from "./SearchBarLogic";

// Context

// Services

// Styles
import "./SearchBar.css";

// Assets

export const SearchBar = () => {
	const {
		onSearchBarInputKeyDown,
		layerIndexInputRef,
		layerIndexInputValue,
		changeLatentLayerInputValue,
		latentIndexInputRef,
		latentIndexInputValue,
		changeLatentIndexInputValue,
		currLatentLayer,
		currLatentIndex,
		goToLatentPage,
	} = SearchBarLogic();

	return (
		<div className='latent-search-bar-container'>
			<input className='latent-search-bar' placeholder='Search latents by typing keywords' onKeyDown={onSearchBarInputKeyDown}></input>
			<div className='latent-search-navigation-container'>
				{/* Layer Navigation */}
				<div className='latent-search-navigation-item latent-search-navigation-item-layer'>
					<label>
						<i className='fa-solid fa-layer-group' />
						<span>Layer</span>
					</label>
					<input ref={layerIndexInputRef} value={layerIndexInputValue} onChange={changeLatentLayerInputValue} placeholder='e.g. 8' />
				</div>

				{/* Latent Navigation */}
				<div className='latent-search-navigation-item latent-search-navigation-item-latent'>
					<label>
						<i className='fa-regular fa-circle' />
						<span>Latent</span>
					</label>
					<input ref={latentIndexInputRef} value={latentIndexInputValue} onChange={changeLatentIndexInputValue} placeholder='e.g. 512' />
				</div>

				{/* View Latent */}
				<div className='latent-search-navigation-go-to-latent-btn-container'>
					<a
						href={"/latent?layer=" + (currLatentLayer + 1) + "&latent=" + (currLatentIndex + 1)}
						rel='noopener noreferrer'
						onMouseDown={(e) => e?.preventDefault()}
						onClick={goToLatentPage}
						onAuxClick={goToLatentPage}
					>
						<button className='latent-search-navigation-go-to-latent-btn button' onMouseDown={(e) => e?.preventDefault()}>
							View Latent
						</button>
					</a>
				</div>
			</div>
		</div>
	);
};
