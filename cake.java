import java.util.Scanner;
public class cake {
public static void main(String[] args) {

		 Scanner sc = new Scanner(System.in);

	        int n = sc.nextInt();
	        int max = 0;
	        int count = 0;

	        for (int i = 0; i < n; i++) {
	            int num = sc.nextInt();

	            if (num > max) {
	                max = num;
	                count=1;
	            } else if (num == max) {
	                count++;
	            }
	        }

	        System.out.println(count);

	}}
