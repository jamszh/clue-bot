module.exports = class Roller {	
	/* 
	 * Method that determines reward list and encodes it
	 */
	roll() {
	
		// Number of items hardcoded for now
		var item_counts = [26, 108, 15, 11];
	
		// Set number of rolls (Dependent on difficulty) on common table
		var init_roll_count = 4;
		var threshold = 20;
		
		// Page table is seperate
		var table_names = ['pages', 'common', 'unique', 'super', '3a'];
		var roll_table = [0, init_roll_count, 0, 0, 0];
		var curr_idx = 1;
		var roll_val;
		var promote_idx;

		for (var i = 0; i < init_roll_count; i++) {
			roll_val = Math.floor(Math.random() * threshold);
	
			if (roll_val == 0) {
				roll_table[curr_idx+1]++;
				roll_table[curr_idx]--;
			}
		}
	
		while (curr_idx < roll_table.length) {
			var rolls = roll_table[curr_idx];
			for (var i = 0; i < rolls; i++) {
				roll_val = Math.floor(Math.random() * item_counts[curr_idx-1]);
	
				if (roll_val == 0) {
					// Pages are at the 0th index, but are of greater value than common.
					// However rolls cannot be promoted from this page table hence it is at the 0th index
					promote_idx = curr_idx;
	
					if (curr_idx == 1) {
						promote_idx--;
					} else {
						promote_idx++;
					}

					// Increment the value at the promoted idx, decrement current
					// No promotion at idx table.length (No table after 3a)
					if (promote_idx < roll_table.length) {
						roll_table[promote_idx]++;
						roll_table[curr_idx]--;
					}
				}
			}
			curr_idx++;
		}
	
		// Complementary common rolls
		roll_table[1] += Math.floor(Math.random() * 2);
	
		var encoding = {};
	
		for (var i = 0; i < roll_table.length; i++) {
			encoding[table_names[i]] = roll_table[i];
		}
		return encoding;
	}

	/*
     * Arbitrary values, since I'm not sure how they roll stackable quantities
     */
    roll_stackable(item_name) {
		if (item_name == "Coins") {
            return 2000 + Math.floor(Math.random() * 6666);
        } else {
            return 5 + Math.floor(Math.random() * 33);
        }
	}
}