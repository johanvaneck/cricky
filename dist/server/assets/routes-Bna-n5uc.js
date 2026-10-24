import { t as createServerFn } from "../server.js";
import { n as Route, r as createSsrRpc } from "./router-C2bdFupi.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/routes/index.tsx?tsr-split=component
var makeMatch = createServerFn({ method: "POST" }).validator((v) => v).handler(createSsrRpc("c813f3fbac0e4d9a3660c1634d43180819f6b6bc6ef5a36ab7a121a8f3f1ce9e"));
var score = createServerFn({ method: "POST" }).validator((v) => v).handler(createSsrRpc("3f94a8930ad53777c2936e8f3e8df3247373dd2b1f99b9997b4bc71b470fa64d"));
var undo = createServerFn({ method: "POST" }).validator((v) => v).handler(createSsrRpc("cb6de2242eb8a4fd0012fbf4bd5d3abedb1d932773b677b8622327e7c52ca6d2"));
function Home() {
	const { matches: initial } = Route.useLoaderData();
	const [active, setActive] = useState(initial.find((m) => m.status === "live")?.id ?? null);
	const [items, setItems] = useState(initial);
	const [home, setHome] = useState("Proteas");
	const [away, setAway] = useState("");
	const [overs, setOvers] = useState(20);
	const match = items.find((m) => m.id === active);
	const [refresh, setRefresh] = useState(0);
	match && Route.useLoaderData();
	const [scoreState, setScoreState] = useState({
		runs: 0,
		wickets: 0,
		legal: 0,
		balls: []
	});
	async function start() {
		const m = await makeMatch({ data: {
			home,
			away: away || "Opposition",
			overs
		} });
		setItems([m, ...items]);
		setActive(m.id);
		setScoreState({
			runs: 0,
			wickets: 0,
			legal: 0,
			balls: []
		});
	}
	async function record(runs, legal = 1, wicket = 0, kind = "run") {
		if (!match) return;
		await score({ data: {
			id: match.id,
			runs,
			legal,
			wicket,
			kind
		} });
		setScoreState((s) => ({
			...s,
			runs: s.runs + runs,
			wickets: s.wickets + wicket,
			legal: s.legal + legal,
			balls: [...s.balls, legal ? String(runs) : kind]
		}));
		setRefresh(refresh + 1);
	}
	async function undoLast() {
		if (!match) return;
		await undo({ data: { id: match.id } });
		setScoreState((s) => {
			const last = s.balls.at(-1);
			return {
				...s,
				runs: s.runs - (Number(last) || 0),
				wickets: s.wickets,
				legal: s.legal - (last === "wd" || last === "nb" ? 0 : 1),
				balls: s.balls.slice(0, -1)
			};
		});
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-[#f7f7ee] text-[#123d2b]",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "bg-[#075b3b] text-white px-6 py-5 flex justify-between",
			children: [/* @__PURE__ */ jsx("div", {
				className: "font-black tracking-widest",
				children: "🌼 PROTEA / CRICKY"
			}), /* @__PURE__ */ jsx("span", { children: "LIVE SCORING" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl p-5 md:p-10",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-8",
				children: [/* @__PURE__ */ jsx("p", {
					className: "uppercase tracking-[.3em] text-sm text-[#af8c00]",
					children: "The beautiful game, counted"
				}), /* @__PURE__ */ jsxs("h1", {
					className: "text-4xl md:text-6xl font-black mt-2",
					children: [
						"Every run",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("span", {
							className: "text-[#d5a900]",
							children: "tells a story."
						})
					]
				})]
			}), !match ? /* @__PURE__ */ jsxs("section", {
				className: "rounded-3xl bg-white p-6 shadow-lg max-w-xl",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold mb-4",
						children: "Start a match"
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block mb-3",
						children: ["Home team", /* @__PURE__ */ jsx("input", {
							className: "field",
							value: home,
							onChange: (e) => setHome(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block mb-4",
						children: ["Away team", /* @__PURE__ */ jsx("input", {
							className: "field",
							value: away,
							onChange: (e) => setAway(e.target.value),
							placeholder: "Opposition"
						})]
					}),
					/* @__PURE__ */ jsxs("label", { children: ["Overs", /* @__PURE__ */ jsx("input", {
						className: "field",
						type: "number",
						min: "1",
						max: "50",
						value: overs,
						onChange: (e) => setOvers(+e.target.value)
					})] }),
					/* @__PURE__ */ jsx("button", {
						className: "primary mt-4",
						onClick: start,
						children: "Start scoring →"
					}),
					items.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold",
							children: "Recent matches"
						}), items.map((m) => /* @__PURE__ */ jsxs("button", {
							className: "block underline mt-2",
							onClick: () => setActive(m.id),
							children: [
								m.home,
								" vs ",
								m.away
							]
						}, m.id))]
					})
				]
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("section", {
					className: "rounded-3xl bg-[#075b3b] p-7 text-white shadow-xl",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between text-sm uppercase tracking-widest",
							children: [/* @__PURE__ */ jsxs("span", { children: [
								match.home,
								" v ",
								match.away
							] }), /* @__PURE__ */ jsx("button", {
								onClick: () => setActive(null),
								children: "New match +"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex items-end gap-3",
							children: [/* @__PURE__ */ jsxs("strong", {
								className: "text-6xl",
								children: [
									scoreState.runs,
									"/",
									scoreState.wickets
								]
							}), /* @__PURE__ */ jsxs("span", {
								className: "pb-2 text-xl",
								children: [
									"(",
									Math.floor(scoreState.legal / 6),
									".",
									scoreState.legal % 6,
									" overs)"
								]
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 text-lime-200",
							children: [
								"CRR ",
								scoreState.legal ? (scoreState.runs * 6 / scoreState.legal).toFixed(2) : "0.00",
								" · ",
								match.oversLimit,
								" overs"
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-6 flex gap-2",
							children: scoreState.balls.slice(-6).map((b, i) => /* @__PURE__ */ jsx("span", {
								className: "rounded-full bg-white/15 w-9 h-9 grid place-items-center",
								children: b
							}, i))
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-3 md:grid-cols-6 gap-3 mt-5",
					children: [
						0,
						1,
						2,
						3,
						4,
						6
					].map((n) => /* @__PURE__ */ jsx("button", {
						className: "score",
						onClick: () => record(n),
						children: n === 0 ? "DOT" : n
					}, n))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-3 gap-3 mt-3",
					children: [
						/* @__PURE__ */ jsx("button", {
							className: "extra",
							onClick: () => record(1, 0, 0, "wd"),
							children: "WIDE +1"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "extra",
							onClick: () => record(1, 0, 0, "nb"),
							children: "NO BALL +1"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "extra",
							onClick: () => record(0, 1, 1, "wicket"),
							children: "WICKET"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "extra",
							onClick: () => record(1, 1, 0, "bye"),
							children: "BYE"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "extra",
							onClick: () => record(1, 1, 0, "legbye"),
							children: "LEG BYE"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "extra",
							onClick: undoLast,
							children: "UNDO"
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 text-sm text-gray-600",
					children: "Scoring is saved on this server. Overs count legal deliveries only."
				})
			] })]
		})]
	});
}
export { Home as component };
