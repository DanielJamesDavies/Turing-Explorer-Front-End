import { atomWithStorage } from "jotai/utils";

export const explorerVersions = [
	{ value: 1, label: "Version 1.0 (December 2024)" },
	{ value: 2, label: "Version 2.0 (July 2026)" },
];

export const explorerVersionAtom = atomWithStorage("turing-explorer-version", 1);
