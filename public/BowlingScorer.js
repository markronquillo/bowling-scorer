
function BowlingGame() {
	var score = 0
	,	currentFrame = 0 
	,	ballThrows = []
	,	firstThrow = 1	
	;

	this.Add = function(pins) {
		ballThrows.push(pins);
		score += pins;

		if (firstThrow != 1) {
			currentFrame += 1;
			firstThrow == 1;	
		}
	}

	this.GetScore = function() {
		return this.ScoreForFrame(currentFrame);
	}

	this.CurrentFrame = function() {
		return currentFrame;
	}

	this.ScoreForFrame = function(frame) {
		if (currentFrame == 0 && ballThrows.length == 1) return ballThrows[0];

		var frameScore = 0
		,	totalScore = 0;
		for (var i=0; i < frame * 2; i++) {

			// if strike
			if (ballThrows[i] == 10) {
				totalScore += ballThrows[i+1] + ballThrows[i+2];
				continue;
			}

			frameScore = ballThrows[i] + ballThrows[++i];
			totalScore += frameScore;

			if (frameScore == 10) {
				totalScore += ballThrows[i+1];
			}
		}
		return totalScore;
	}
}