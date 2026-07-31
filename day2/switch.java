import java.util.Scanner;

public class ATM {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("1. Check Balance");
        System.out.println("2. Deposit");
        System.out.println("3. Withdraw");
        System.out.println("4. Exit");

        System.out.print("Enter your choice: ");
        int choice = sc.nextInt();

        switch(choice) {

            case 1:
                System.out.println("Balance = ₹5000");
                break;

            case 2:
                System.out.println("Deposit Selected");
                break;

            case 3:
                System.out.println("Withdraw Selected");
                break;

            case 4:
                System.out.println("Thank You");
                break;

            default:
                System.out.println("Invalid Choice");
        }
    }
}
