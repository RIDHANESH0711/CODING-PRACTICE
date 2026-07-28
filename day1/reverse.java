import java.util.Scanner;
public class reverse {
    public static void main(String[]args){
        Scanner scan = new Scanner(System.in);
        int a = scan.nextInt();
        int rev = 0;
        while(a!=0){
            int digit = a%10;
            rev = rev*10 + digit;
            a/=10;
        }
        System.out.println(rev);
        scan.close();
        
        

    }

    
}
