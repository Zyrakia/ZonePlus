/**
 * An enum representing the detection accuracy of a zone.
 * Changing this affects what the zone considers to be
 * inside or outside, this will only affect players and
 * has no effect on regular parts.
 */
export interface DetectionEnum {
	/**
	 * Defines WholeBody accuracy, meaning multiple checks will
	 * be casted over an entire player's character.
	 */
	WholeBody: { value: 0 };

	/**
	 * Defines Centre accuracy, meaning a singular check will
	 * be performed on the player's HRP.
	 */
	Centre: { value: 2 };

	/**
	 * Defines Automatic accuracy, meaning the zone will
	 * dynamically switch between WholeBody and Centre based
	 * on the number of players on the server.
	 *
	 * This typically has no affect unless servers are running
	 * with 100+ players.
	 */
	Automatic: { value: 3 };
}
