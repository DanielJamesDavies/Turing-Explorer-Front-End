// Packages
import { ChevronDown, X } from "lucide-react";
import { useEffect } from "react";
import { useAtom } from "jotai";

// Store
import { explorerVersionAtom, explorerVersions } from "../../store/settings-atoms";

// Styles
import "./settings-modal.css";

// Existing project lint config enables prop-types, but this app does not use the prop-types package.
// eslint-disable-next-line react/prop-types
export const SettingsModal = ({ isOpen, onClose }) => {
	const [explorerVersion, setExplorerVersion] = useAtom(explorerVersionAtom);

	useEffect(() => {
		if (!isOpen) return;

		const closeOnEscape = (e) => {
			if (e?.key === "Escape") onClose();
		};

		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className='settings-modal-overlay' onClick={onClose}>
			<div className='settings-modal' onClick={(e) => e.stopPropagation()}>
				<div className='settings-modal-header'>
					<h2>Settings</h2>
					<button className='settings-modal-close-button' type='button' onClick={onClose} aria-label='Close settings'>
						<X size={17} strokeWidth={2} />
					</button>
				</div>

				<div className='settings-modal-content'>
					<label className='settings-modal-field'>
						<span>Explorer version</span>
						<div className='settings-modal-select-wrapper'>
							<select value={explorerVersion} onChange={(e) => setExplorerVersion(Number(e.target.value))}>
								{explorerVersions.map((version) => (
									<option key={version.value} value={version.value}>
										{version.label}
									</option>
								))}
							</select>
							<ChevronDown className='settings-modal-select-icon' size={16} strokeWidth={2} />
						</div>
					</label>
				</div>
			</div>
		</div>
	);
};
