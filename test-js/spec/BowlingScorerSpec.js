describe("BowlingScorer", function() {
	beforeEach(function() {
		this.game = new BowlingGame();
	});

	it("accepts a throw", function() {
		this.game.Add(4);
		expect(4).toEqual(this.game.GetScore());
	});

	it("accepts two throws", function() {
		this.game.Add(4);
		this.game.Add(3);
		expect(7).toEqual(this.game.GetScore());
	});

	it("accepts four throws no mark", function() {
		this.game.Add(4);
		this.game.Add(4);

		this.game.Add(4);
		this.game.Add(4);

		expect(16).toEqual(this.game.GetScore());

		expect(2).toEqual(this.game.CurrentFrame());
	});

	it("accepts four throws with spare", function(){ 
		this.game.Add(4);
		this.game.Add(6);

		this.game.Add(6);
		this.game.Add(3);

		expect(16).toEqual(this.game.ScoreForFrame(1));
		expect(25).toEqual(this.game.ScoreForFrame(2));
	});

	it("accepts six throws with spare", function() {
		this.game.Add(5);
		this.game.Add(5);

		this.game.Add(7);
		this.game.Add(3);

		this.game.Add(1);
		this.game.Add(2);

		expect(17).toEqual(this.game.ScoreForFrame(1));
		expect(28).toEqual(this.game.ScoreForFrame(2));
		expect(31).toEqual(this.game.ScoreForFrame(3));
		expect(31).toEqual(this.game.GetScore());
	});

	it("accepts three throws with strike", function() {
		this.game.Add(10);

		this.game.Add(3);
		this.game.Add(5);

		expect(18).toEqual(this.game.ScoreForFrame(1));
	});

});