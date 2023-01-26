<script lang="ts">
	import Counter from './Counter.svelte';

	let board: number[][];

	//Columna en la que se coloca una reina
	let boardsSolution: Array<number[][]> = [];

	function verifyRowConflict(r: number[]) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (r[i] == j) {
					//si es igual a la posocion se coloca la reina
					board[i][j] = 1;
				} else {
					if ((i + j) % 2 == 0) {
						board[i][j] = 2;
					} else {
						board[i][j] = 3;
					}
				}
			}
		}
		boardsSolution.push(board);
		board = Array(8)
			.fill(null)
			.map(() => Array(8).fill(0));
	}

	function conflict(row: number[]): boolean {
		let response: boolean = false;

		//se verifica si existe una reina en la columna
		for (let i = 0; i < 7; i++) {
			for (let j = i + 1; j < 8; j++) {
				if (row[i] == row[j]) return true;
			}
		}

		//se verifica si existe una reina en diagonal
		for (let i = 0; i < 7; i++) {
			for (let j = i + 1; j < 8; j++) {
				if (row[i] + i == row[j] + j) return true;
				if (row[i] - i == row[j] - j) return true;
			}
		}

		return response;
	}

	function solutions() {
		for (let a = 0; a < 8; a++) {
			for (let b = 0; b < 8; b++) {
				for (let c = 0; c < 8; c++) {
					for (let d = 0; d < 8; d++) {
						for (let e = 0; e < 8; e++) {
							for (let f = 0; f < 8; f++) {
								for (let g = 0; g < 8; g++) {
									for (let h = 0; h < 8; h++) {
										let attemptBoard: number[] = Array(a, b, c, d, e, f, g, h);
										if (!conflict(attemptBoard)) {
											verifyRowConflict(attemptBoard);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	function solve() {
		board = Array(8)
			.fill(null)
			.map(() => Array(8).fill(0));

		//Columna en la que se coloca una reina
		boardsSolution = [];
		solutions();
	}
	let c = 1;
	if (boardsSolution) {
		board = boardsSolution[0];
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="home">
	<button class="text-white text-2xl btn" on:click={() => solve()}>Resolver</button>
	<p class="text-lg">
		Se han encontrado: <strong class=" text-blue-900">
			{boardsSolution.length}
		</strong>
		soluciones
	</p>
	{#if boardsSolution.length > 0}
		<Counter bind:count={c} limit={boardsSolution.length} />
		{@const board = boardsSolution[c - 1]}
		{#if board}
			<div class="board w-144 border-cyan-200">
				{#each board as row, i}
					{#each row as square, j}
						<div
							class={`sm:w-12 sm:h-12 md:w-20 md:h-20 text-center text-2xl square-${
								square === 2 ? 'white ' : 'black '
							} ${square === 1 ? 'queen' : ''}`}
						>
							{square === 1 ? '♕' : ''}
						</div>
					{/each}
				{/each}
			</div>
		{/if}
	{/if}
</section>

<style lang="postcss">
	.board {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);
	}

	.square-white {
		background-color: white;
		border: solid 1px white;
	}

	.square-black {
		background-color: black;
		border: solid 1px black;
	}

	.queen {
		background-color: yellow;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
