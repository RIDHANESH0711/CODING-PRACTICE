/*public class addition{
    
        int a = 10;
        int b = 20;
        
    
    void sum(){
     System.out.print(a
        +b);

    }
    public static void main(String[]args){
        addition f= new addition();
        f.sum();


    }
}*/
import java.util.Scanner;
public class find {
    void Rds(int a){
        if(a%2==0){
           System.out.print("even");
        }
        else{
            System.out.print("odd");
        }


    }

public static void main(String[] args){
find h = new find();
Scanner scan = new Scanner(System.in);
int f2 = scan.nextInt();
h.Rds(f2);
scan.close();
}}