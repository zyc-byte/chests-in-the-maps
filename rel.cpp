#include<bits/stdc++.h>
#include<windows.h>
#include<conio.h>
using namespace std;
const int N=55;
int n,a[N][N],sum[20],x,y,fx,money=0,hp=20,full=20,step=0,Biome_Fest;
int zombieX[5],zombieY[5],zombieHp[5],zombieS;
int skeletonX[5],skeletonY[5],skeletonHp[5],skeletonS;
int arrowX[200005],arrowY[200005],arrowFx[200005],arrowS;
int nether[N][N];
int lava_zombieX[5],lava_zombieY[5],lava_zombieHp[5],lava_zombieS;
int cx[4]= {0,1,0,-1};
int cy[4]= {1,0,-1,0};
int is_order;
bool vis[N][N],flag=0,is_act_door=0,is_debug=0;
int thingMoney[20]= {1,5,100,100,200,300,1000,5000,100000,500000,300000,0,0,10,0,100000,200000,100000,200000};
string died_Information="";
string Blue_slogan[11]{
	"The Next Level!It's the Nether!",
	"Will you open chests again?",
	"Open Chests,kill Mobs!",
	"Made By hezhibao!",
	"Canary Version Made By ZycNotFound!",
	"Publicize By kaikaikaihuaya!",
	"Inspiration By Heletong!",
	"Noooooooooooo!I want to play CHESTS IN THE MAPS!",
	"Where is the door???",
	"There's a chest!",
	"The colorful world!"
};
string biome[10]={
	"chest:Overworld",
	"chest:Nether",
	"chest:Nether Fortress"
};
bool in(int x,int y) {
	return (x>=1&&x<=n&&y>=1&&y<=n);
}
void checkRoad(int x,int y) { //����Ƿ���·
	if(x==n-1&&y==n-1) {
		flag=1;
		return ;
	}
	if(a[x][y]>5) {
		return ;
	}
	vis[x][y]=1;
	for(int i=0; i<4; i++) {
		int tx=x+cx[i],ty=y+cy[i];
		if(in(tx,ty)&&(a[tx][ty]<5||a[tx][ty]==11)&&vis[tx][ty]==0) {
			checkRoad(tx,ty);
		}
	}
	return ;
}
char printChar(int x) { //��ת�ַ�
	if(x<5){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xF0);
		return ' ';
	}
	if(x>=5&&x<=7){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xCF);
		return 'W';
	}
	if(x==8){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xE0);
		return 'C';
	}
	if(x==9){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xAF);
		return 'Z';
	}
	if(x==10){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x9F);
		return 'Y';
	}
	if(x==11){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x80);
		return 'D';
	}
	if(x==12){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xAF);
		return '2';
	}
	if(x==13){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xAF);
		return '1';
	}
	if(x==14){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xF0);
		return 'S';
	}
	if(x==15){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xF0);
		return '2'; 
	}
	if(x==16){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xF0);
		return '1';
	}
	if(x==17){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xF0);
		return 'A';
	}
	if(x==18){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x50);
		return 'D';
	}
}
char printChar_nether(int x){
	if(x==0){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xC0);
		return ' ';
	}
	if(x==1){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x0C);
		return 'N';
	}
	if(x==2){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x9F);
		return 'Y';
	}
	if(x==3){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x50);
		return 'D';
	}
	if(x==4){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0xE0);
		return 'C';
	}
	if(x==5){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x45);
		return 'Z';
	}
	if(x==6){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x45);
		return '4';
	}
	if(x==7){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x45);
		return '3';
	}
	if(x==8){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x45);
		return '2';
	}
	if(x==9){
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x45);
		return '1';
	}
}
void mp() { //�����ͼ
	printf(" �X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�j�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�j�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n"); 
	printf(" �U ��Ǯ:%9d",money);
	printf(" �U ����:%9d",hp);
	printf("�U ��ʳ��:%7d�U \n",full);
	printf(" �^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�m�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�m�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n"); 
	printf("\n");
	printf("  ");
	for(int i=1; i<=n; i++) {
		printf("%3d",i);
	}
	printf("\n");
	for(int i=1; i<=n; i++) {
		printf("%2d ",i);
		for(int j=1; j<=n; j++) {
			printf("[%c]",printChar(a[i][j]));
			SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x03);
		}
		printf("\n");
	}
	if(is_debug==1){
		printf("\n");
		printf("Map size:%d\n",n);
		printf("Coordinate:(%d,%d)\n",x,y);
		printf("Direction:");
		if(fx==0) printf("East");
		if(fx==1) printf("South");
		if(fx==2) printf("West");
		if(fx==3) printf("North");
		printf("(Fancing:%d)\n",fx);
		printf("Biome Fest:");
		cout<<biome[Biome_Fest]<<endl;
		printf("Step for Full:%d\n",step);
		printf("Map dataization:\n");
		for(int i=1;i<=n;i++){
			for(int j=1;j<=n;j++){
				printf("%d ",a[i][j]);
			}
			printf("\n");
		}
		printf("Total thing:\n");
		for(int i=0;i<17;i++){
			printf("%d ",sum[i]);
		}
		printf("\n");
		printf("Zombie Total:%d\n",zombieS);
		for(int i=1;i<=zombieS;i++){
			printf("Zombie Coordinate:(%d,%d) Hp:%d\n",zombieX[i],zombieY[i],zombieHp[i]);
		}
		printf("Skeleton Total:%d\n",skeletonS);
		for(int i=1;i<=skeletonS;i++){
			printf("Skeleton Coordinate:(%d,%d)\n",skeletonX[i],skeletonY[i]);
		}
		printf("Arrow Total:%d\n",arrowS);
		for(int i=1;i<=arrowS;i++){
			if(arrowX[i]>0&&arrowY[i]>0) printf("Arrow Coordinate:(%d,%d)\n",arrowX[i],arrowY[i]);
		}
	}
}
void mp_Nether() { //�����ͼ
	printf(" �X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�j�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�j�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n"); 
	printf(" �U ��Ǯ:%9d",money);
	printf(" �U ����:%9d",hp);
	printf("�U ��ʳ��:%7d�U \n",full);
	printf(" �^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�m�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�m�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n"); 
	printf("\n");
	printf("  ");
	for(int i=1; i<=n; i++) {
		printf("%3d",i);
	}
	printf("\n");
	for(int i=1; i<=n; i++) {
		printf("%2d ",i);
		for(int j=1; j<=n; j++) {
			printf("[%c]",printChar_nether(nether[i][j]));
			SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x0C);
		}
		printf("\n");
	}
	if(is_debug==1){
		printf("\n");
		printf("Map size:%d\n",n);
		printf("Coordinate:(%d,%d)\n",x,y);
		printf("Direction:");
		if(fx==0) printf("East");
		if(fx==1) printf("South");
		if(fx==2) printf("West");
		if(fx==3) printf("North");
		printf("(Fancing:%d)\n",fx);
		printf("Biome Fest:");
		cout<<biome[Biome_Fest]<<endl;
		printf("Step for Full:%d\n",step);
		printf("Map dataization:\n");
		for(int i=1;i<=n;i++){
			for(int j=1;j<=n;j++){
				printf("%d ",nether[i][j]);
			}
			printf("\n");
		}
		printf("Lava Zombie Total:%d\n",lava_zombieS);
		for(int i=1;i<=lava_zombieS;i++){
			printf("Lava Zombie Coordinate:(%d,%d) Hp:%d\n",lava_zombieX[i],lava_zombieY[i],lava_zombieHp[i]);
		}
		printf("Total thing:\n");
		for(int i=0;i<17;i++){
			printf("%d ",sum[i]);
		}
	}
}
void makeMp(int x,int y) { //������ͼ
	vis[x][y]=1;
	a[x][y]=rand()%8;
	for(int i=0; i<4; i++) {
		int tx=x+cx[i],ty=y+cy[i];
		if(in(tx,ty)&&a[tx][ty]==0) {
			makeMp(tx,ty);
		}
	}
}
void makeMp_nether(){
	int nether_mid;
	if(n%2==0) nether_mid=n/2;
	else if(n%2==1) nether_mid=(n+1)/2;
	for(int i=1;i<=n;i++){
		for(int j=1;j<=n;j++){
			if(i==nether_mid-1||i==nether_mid||i==nether_mid+1||j==nether_mid-1||j==nether_mid||j==nether_mid+1){
				nether[i][j]=1;
			}
			else{
				nether[i][j]=0;
			}
		}
	}
	nether[1][1]=3;
	x=1,y=2;
	nether[x][y]=2;
	nether[nether_mid][nether_mid]=4;
}
void chest() { //������
	system("cls");
	printf("����\n");
	printf("�X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n");
	for(int i=0; i<8; i++) {
		int ChestMoney;
		if(i==1){
			ChestMoney=rand()%64;
		}
		if(i<=3) {
			ChestMoney=rand()%20;
		}
		if(i>3&&i<=5) {
			ChestMoney=rand()%10;
		}
		if(i>5){
			ChestMoney=rand()%3;
		}
		if(i==0) printf("�U ԭʯ:%2d               �U ",ChestMoney),sum[0]+=ChestMoney;
		if(i==1) printf("�U ú̿:%2d               �U ",ChestMoney),sum[1]+=ChestMoney;
		if(i==2) printf("�U ����:%2d               �U ",ChestMoney),sum[2]+=ChestMoney;
		if(i==3) printf("�U ��:%2d               �U ",ChestMoney),sum[3]+=ChestMoney;
		if(i==4) printf("�U ��ʯ:%2d               �U ",ChestMoney),sum[4]+=ChestMoney;
		if(i==5) printf("�U ���ʯ:%2d             �U ",ChestMoney),sum[5]+=ChestMoney;
		if(i==6) printf("�U �̱�ʯ:%2d             �U ",ChestMoney),sum[6]+=ChestMoney;
		if(i==7) printf("�U ��ʯ:%2d               �U ",ChestMoney),sum[7]+=ChestMoney;
		printf("\n�d�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�g \n");
	}
	int ChestMoney=rand()%4;
	if(ChestMoney<3) ChestMoney=0;
	else if(ChestMoney==3) ChestMoney=1;
	printf("�U ���ʯ:%2d             �U ",ChestMoney),sum[14]+=ChestMoney;
	printf("\n�^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n");
	printf("�ѹ���ϣ�\n");
	system("pause");
	return ;
}
void chest_nether(){
	system("cls");
	printf("����\n");
	printf("�X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n");
	for(int i=15; i<17; i++) {
		int ChestMoney;
		ChestMoney=rand()%10;
		if(i==15) printf("�U �½�ʯӢ:%2d           �U ",ChestMoney),sum[15]+=ChestMoney;
		if(i==16) printf("�U өʯ:%2d               �U ",ChestMoney),sum[16]+=ChestMoney;
		if(i<16) printf("\n�d�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�g \n");
	}
	printf("\n�^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n");
	printf("�ѹ���ϣ�\n");
	system("pause");
	return ;
}
void shop() { //�̵� 
	system("cls");
	while(1) {
		int shopSelect;
		printf("��ӭ�����̵�!\n");
		printf("��������Ҫ��ʲô:\n");
		printf("[0]�� [1]�� [2]�˳�\n");
		scanf("%d",&shopSelect);
		if(shopSelect==0) {
			printf("��Ǯ:%d\n",money);
			printf("1.ĩӰ����:$10,0000 ����������9*9�ķ�Χ��\n");
			printf("2.����ҩˮ:$50,0000 �ָ�����Ѫ\n");
			printf("3.�罦���˺�ҩˮ:$30,0000 ��5*5��Χ�ڵĹ����10���˺�\n");
			printf("4.���:$10 �ָ�3�㱥ʳ��\n");
			printf("��Ҫ���Ǹ�(���)?�����?");
			int buy,buyS;
			scanf("%d%d",&buy,&buyS);
			if(buy==1) {
				if(money>=thingMoney[8]*buyS){
					sum[8]+=buyS,money-=thingMoney[8]*buyS;
				} else{
					printf("�ϰ�:����͹���!���������ȥ!\n");
					Sleep(2000);
				}
			} else if(buy==2) {
				if(money>=thingMoney[9]*buyS){
					sum[9]+=buyS,money-=thingMoney[9]*buyS;
				} else{
					printf("�ϰ�:����͹���!���������ȥ!\n");
					Sleep(2000);
				}
			} else if(buy==3) {
				if(money>=thingMoney[10]*buyS){
					sum[10]+=buyS,money-=thingMoney[10]*buyS;
				} else{
					printf("�ϰ�:����͹���!���������ȥ!\n");
					Sleep(2000);
				}
			} else if(buy==4){
				if(money>=thingMoney[13]*buyS){
					sum[13]+=buyS,money-=thingMoney[13]*buyS;
				} else{
					printf("�ϰ�:���������,ȥ���������ȥ!\n");
				}
			}
		}
		if(shopSelect==1) {
			printf("��Ǯ:%d\n",money);
			for(int i=0; i<8; i++) {
				money+=sum[i]*thingMoney[i],sum[i]=0;
			}
			for(int i=15 ;i<17; i++){
				money+=sum[i]*thingMoney[i],sum[i]=0;
			}
			printf("�ɽ�! ��Ǯ:%d\n",money);
			Sleep(1000);
		}
		if(shopSelect==2){
			return ;
		}
		system("cls");
	}
}
void quickTeach(){//���ٽ�ѧ 
	system("cls");
	printf(" �X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n");
	printf(" �U �̳�:                                                                       �U \n");
	printf(" �U 1.����:                                                                     �U \n");
	printf(" �U   ������:' '=����,'W'=ǽ,'C'=����,'Y'=���,'Z'=��ʬ,'S'=����,'D'=��,'A'=��ʸ�U \n");
	printf(" �U   �½�:' '=�½���,'N'=�½�ש,'D'=�½���,'C'=����,'Z'=���ҽ�ʬ               �U \n");
	printf(" �U 2.����:                                                                     �U \n");
	printf(" �U   (1)w,a,s,d:��������                                                       �U \n");
	printf(" �U   (2)o:����һ�η��������                                                   �U \n");
	printf(" �U   (3)k:�������ܵĹ���                                                       �U \n");
	printf(" �U   (4)r:�˳�                                                                 �U \n");
	printf(" �U   (5)e:�򿪱���                                                             �U \n");
	printf(" �U   (6)t:�鿴�̳�                                                             �U \n");
	printf(" �U   (7)u:ʹ�õ���                                                             �U \n");
	printf(" �U   (8)q:�Զ���                                                               �U \n");
	printf(" �U 3.ָ���ʹ��(����'��Ϸѡ��-����'������1)                                    �U \n");
	printf(" �U   (1)/kill [type=[ʵ����]] ɱ��ĳ��ʵ��                                     �U \n");
	printf(" �U     ʵ������:                                                               �U \n");
	printf(" �U     1.chest:zombie [���/All(����)]:��[���]����ʬ/���н�ʬ                 �U \n");
	printf(" �U     2.chest:skeleton [���/All(����)]:��[���]������/��������               �U \n");
	printf(" �U     3.chest:player:���(��)                                                 �U \n");
	printf(" �U     4.chest:all:����ʵ��                                                    �U \n");
	printf(" �U   (2)/tp �� �� ����Ҵ��͵�(��,��)                                          �U \n");
	printf(" �U   (3)/beta_set [������] [��ֵ] �޸���Ϸ����                                 �U \n");
	printf(" �U     ��������:                                                               �U \n");
	printf(" �U     1.a[x][y]         ��ͼ����                                              �U \n");
	printf(" �U     2.x               ���������                                            �U \n");
	printf(" �U     3.y               ���������                                            �U \n");
	printf(" �U     4.money           ��ҽ�Ǯ                                              �U \n");
	printf(" �U     5.hp              �������                                              �U \n");
	printf(" �U     6.full            ��ұ�ʳ��                                            �U \n");
	printf(" �U     7.sum[i]           ��Ʒ������                                           �U \n");
	printf(" �^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n"); 
}
void useThing(){
	printf("��������:\n");
	printf(" �X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n");
	printf(" �U 1.ĩӰ����:%2d         �U \n",sum[8]);
	printf(" �d�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�g \n");
	printf(" �U 2.����ҩˮ:%2d         �U \n",sum[9]);
	printf(" �d�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�g \n");
	printf(" �U 3.�罦���˺�ҩˮ:%2d   �U \n",sum[10]);
	printf(" �d�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�g \n");
	printf(" �U 4.���ʯ:%2d           �U \n",sum[14]);
	printf(" �^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n");
	printf("��Ҫʹ�õڼ�������?\n");
	int useSelect;
	scanf("%d",&useSelect);
	if(useSelect==1&&sum[8]>0){
		sum[8]--;
		printf("��Ҫ���͵�?:");
		int Ender_Pearl_X,Ender_Pearl_Y;
		scanf("%d%d",&Ender_Pearl_X,&Ender_Pearl_Y);
		Ender_Pearl_X=min(Ender_Pearl_X,x+4),Ender_Pearl_Y=min(Ender_Pearl_Y,y+4);
		Ender_Pearl_X=max(Ender_Pearl_X,x-4),Ender_Pearl_Y=max(Ender_Pearl_Y,y-4);
		a[x][y]=0;
		x=Ender_Pearl_X,y=Ender_Pearl_Y;
		printf("��� ʹ�� ĩӰ����,�ѽ� ��� ���͵� %d %d\n",x,y);
		Sleep(1000);
	}
	if(useSelect==2&&sum[9]>0){
		sum[9]--;
		hp=20;
		printf("��� ʹ�� ����ҩˮ,����ֵ �ָ��� 20/20\n");
	}
	if(useSelect==3&&sum[10]>0){
		sum[10]--;
		for(int i=max(1,x-2);i<=min(n,x+2);i++){
			for(int j=max(1,y-2);j<=min(n,y+2);j++){
				for(int k=1;k<=zombieS;k++){
					if(zombieX[k]==i&&zombieY[k]==j){
						a[zombieX[k]][zombieY[k]]=0;
						zombieX[k]=0,zombieY[k]=0;
						printf("��� ʹ�� �罦���˺�ҩˮ,chest:zombie %d��ɱ����\n",k);
					}
				}
				for(int k=1;k<=skeletonS;k++){
					if(skeletonX[k]==i&&skeletonY[k]==j){
						a[skeletonX[k]][skeletonY[k]]=0;
						skeletonX[k]=0,skeletonY[k]=0;
						printf("��� ʹ�� �罦���˺�ҩˮ,chest:skeleton %d��ɱ����\n",k);
					}
				}
			}
		}
		Sleep(1000);
	}
	if(useSelect==4&&sum[14]>0){
		bool is_Found_Door=0;
		for(int i=0;i<4;i++){
			int tx=x+cx[i],ty=y+cy[i];
			if(a[tx][ty]==11){
				a[tx][ty]=18;
				is_Found_Door=1;
			}
		}
		if(is_Found_Door==0){
			printf("δ�ҵ���(chest:door)!");
		} else if(is_Found_Door==1){
			sum[14]--;
			printf("��� ʹ�� ���ʯ ������ �½紫����(chest:Nether_Door)\n");
			is_act_door=1;
		}
		Sleep(1000);
	}
}
void seeBag(){
	system("cls");
	printf("����\n");
	printf("�X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n");
	for(int i=0; i<17; i++) {
		if(i==0) printf("�U ԭʯ:%2d               �U ",sum[i]);
		if(i==1) printf("�U ú̿:%2d               �U ",sum[i]);
		if(i==2) printf("�U ����:%2d               �U ",sum[i]);
		if(i==3) printf("�U ��:%2d               �U ",sum[i]);
		if(i==4) printf("�U ��ʯ:%2d               �U ",sum[i]);
		if(i==5) printf("�U ���ʯ:%2d             �U ",sum[i]);
		if(i==6) printf("�U �̱�ʯ:%2d             �U ",sum[i]);
		if(i==7) printf("�U ��ʯ:%2d               �U ",sum[i]);
		if(i==8) printf("�U ĩӰ����:%2d           �U ",sum[i]);
		if(i==9) printf("�U ����ҩˮ:%2d           �U ",sum[i]);
		if(i==10) printf("�U �罦���˺�ҩˮ:%2d     �U ",sum[i]);
		if(i==11) printf("�U ����:%2d               �U ",sum[i]);
		if(i==12) printf("�U ��ͷ:%2d               �U ",sum[i]);
		if(i==13) printf("�U ���:%2d               �U ",sum[i]);
		if(i==14){
			if(sum[i]>0){
				for(int j=1;j<=sum[i];j++){
					printf("�U ���ʯ                �U ");
					if(j<sum[i]) printf("\n�d�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�g \n");
				}
			}
		}
		if(i==15) printf("�U �½�ʯӢ:%2d           �U ",sum[15]);
		if(i==16) printf("�U өʯ:%2d               �U ",sum[16]);
		if(i<16){
			printf("\n�d�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�g \n");
		}
	}
	printf("\n�^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n");
	system("pause");
}
void eatFood(){
	printf("ʳ��:\n");
	printf("�X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n");
	printf("�U 1.����:%2d             �U \n",sum[11]);
	printf("�d�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�g \n");
	printf("�U 2.���:%2d             �U \n",sum[13]);
	printf("�^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n");
	int foodSelect,foodS;
	printf("����һ��ʳ��,�Զ���?");
	scanf("%d%d",&foodSelect,&foodS);
	if(foodSelect==1){
		foodS=min(foodS,sum[11]);
		sum[11]-=foodS;
		full=min(20,full+foodS*1);
	}
	if(foodSelect==2){
		foodS=min(foodS,sum[13]);
		sum[13]-=foodS;
		full=min(20,full+foodS*3);
	}
	return ;
}
void game_nether(){
	system("cls");
	system("color 5F");
	for(int i=0;i<=99;i++){
		system("cls");
		printf("\n\n\n\n\n\n                                                  ���ص�����...\n\n                                                     ");
		printf("[%d%%]",i);
		Sleep(10);
	}
	Sleep(1000);
	system("cls");
	printf("\n\n\n\n\n\n                                                  ���ص�����...\n\n                                                     ");
	printf("[100%%]");//���ص��ζ���
	Sleep(1000);
	system("cls");
	system("color 0C");
	int nether_mid;
	if(n%2==0) nether_mid=n/2;
	else if(n%2==1) nether_mid=(n+1)/2;
	makeMp_nether();
	if(n<10) lava_zombieS=1;
	else lava_zombieS=2;
	for(int i=1;i<=lava_zombieS;i++){
		lava_zombieX[i]=rand()%3+nether_mid-1;
		lava_zombieY[i]=rand()%3+nether_mid-1;
		if(lava_zombieX[i]==nether_mid&&lava_zombieY[i]==nether_mid){
			lava_zombieX[i]++;
		}
		lava_zombieHp[i]=5;
		nether[lava_zombieX[i]][lava_zombieY[i]]=5;
	}
	while(1){
		if(step>0&&step%10==0&&full>0){//���±�ʳ��
			full--;
		}
		if(full==20){
			hp++;
			hp=min(hp,20);
		}
		if(full==0){
			hp--;
			if(hp<=0){
				died_Information="You starved to death.";
			}
		}
		if(hp<=0){
			memset(sum,0,sizeof(sum));
			money=0;
			hp=20;
			a[x][y]=0;
			system("cls");
			system("color CF");
			printf("\n\n\n\n\n\n\n");
			printf("                                    �����ˣ�\n\n\n");
			printf("   The information of you dies:");
			cout<<died_Information;
			printf("\n\n\n");
			int YN;
			printf("                      [0]�˳���Ϸ [1]���� [2]���ر�����Ļ");
			arrowS=0;
			memset(arrowX,0,sizeof(arrowX));
			memset(arrowY,0,sizeof(arrowY));
			is_act_door=0;
			scanf("%d",&YN);
			if(YN==0) {
				return ;
			}
			if(YN==1) {
				system("color 03");
				break;
			}
			if(YN==2) {
				system("cls");
				return ;
			}
		}
		if(x==1&&y==1){
			system("color 5F");
			for(int i=0;i<=99;i++){
				system("cls");
				printf("\n\n\n\n\n\n                                                  ���ص�����...\n\n                                                     ");
				printf("[%d%%]",i);
				Sleep(10);
			}
			Sleep(1000);
			system("cls");
			printf("\n\n\n\n\n\n                                                  ���ص�����...\n\n                                                     ");
			printf("[100%%]");//���ص��ζ���
			Sleep(1000);
			return ;
		}
		if((x>=nether_mid-1&&x<=nether_mid+1)||(y>=nether_mid-1&&y<=nether_mid+1)){
			Biome_Fest=2;
		}
		for(int i=1;i<=lava_zombieS;i++){//���ҽ�ʬ�ƶ� 
			if(abs(lava_zombieX[i]-x)<4&&abs(lava_zombieY[i]-y)<4&&lava_zombieX[i]!=0&&lava_zombieY[i]!=0){
				int lava_zombieType=nether[lava_zombieX[i]][lava_zombieY[i]];
				nether[lava_zombieX[i]][lava_zombieY[i]]=0;
				if(x<lava_zombieX[i]&&nether[lava_zombieX[i]-1][lava_zombieY[i]]<2) lava_zombieX[i]--;
				else if(x>lava_zombieX[i]&&nether[lava_zombieX[i]+1][lava_zombieY[i]]<2) lava_zombieX[i]++;
				else if(y<lava_zombieY[i]&&nether[lava_zombieX[i]][lava_zombieY[i]-1]<2) lava_zombieY[i]--;
				else if(y>lava_zombieY[i]&&nether[lava_zombieX[i]][lava_zombieY[i]+1]<2) lava_zombieY[i]++;
				nether[lava_zombieX[i]][lava_zombieY[i]]=lava_zombieType;
			}
		}
		mp_Nether();
		for(int i=1;i<=lava_zombieS;i++){//������ҽ�ʬ���� 
			for(int j=0;j<4;j++){
				int zo_killX=lava_zombieX[i]+cx[j],zo_killY=lava_zombieY[i]+cy[j];
				if(x==zo_killX&&y==zo_killY){
					hp-=2;
					if(hp<=0){
						died_Information="You were killed by the lava zombie.";
					}
					printf("��� �� ���ҽ�ʬ%d(chest:lava zombie %d) ������\n",i,i);
				}
			}
		}
		Biome_Fest=1;
		nether[x][y]=2;
		char todo=getch();
		if(todo=='d'||todo=='s'||todo=='a'||todo=='w') {
			int goX=x,goY=y;
			if(todo=='d') goY++,fx=0;
			if(todo=='s') goX++,fx=1;
			if(todo=='a') goY--,fx=2;
			if(todo=='w') goX--,fx=3;
			if(in(goX,goY)&&nether[goX][goY]==0||nether[goX][goY]==1||nether[goX][goY]==3) {
				int temp;
				if((x>=nether_mid-1&&x<=nether_mid+1)||(y>=nether_mid-1&&y<=nether_mid+1)){
					temp=1;
				} else{
					temp=0;
				}
				nether[goX][goY]=2;
				nether[x][y]=temp;
				x=goX,y=goY;
				step++;
			}
		} else if(todo=='o') {
			int goX,goY;
			goX=x,goY=y;
			if(fx==0) goY++,fx=0;
			if(fx==1) goX++,fx=1;
			if(fx==2) goY--,fx=2;
			if(fx==3) goX--,fx=3;
			if(in(goX,goY)&&(abs(goX-x)<2&&abs(goY-y)<2)&&nether[goX][goY]==4) {
				chest_nether();
				nether[goX][goY]=0;
			}
		} else if(todo=='r') {
			return ;
		} else if(todo=='1'){
			is_debug=!is_debug;
		} else if(todo=='t'){
			quickTeach();
			system("pause");
		} else if(todo=='k'){
			for(int i=0;i<4;i++){
				int killX=x+cx[i],killY=y+cy[i];
				if(nether[killX][killY]>=5&&nether[killX][killY]<=9){
					if(nether[killX][killY]==9){
						nether[killX][killY]=0;
						for(int j=1;j<=lava_zombieS;j++){
							if(killX==lava_zombieX[j]&&killY==lava_zombieY[j]){
								int getZombieMeat=rand()%5,getGoldIrgot=rand()%2;
								lava_zombieX[j]=0,lava_zombieY[j]=0;
								printf("��� ��ɱ�� ���ҽ�ʬ %d,��ȡ ���� * %d,�� * %d\n",j,getZombieMeat,getGoldIrgot);
								sum[11]+=getZombieMeat;
								sum[3]+=getGoldIrgot;
								Sleep(1000);
								break;
							}
						}
					}
					else nether[killX][killY]++;
					for(int j=1;j<=lava_zombieS;j++){
						if(killX==lava_zombieX[j]&&killY==lava_zombieY[j]){
							lava_zombieHp[j]--;
						}
					}
				}
			}
		} else if(todo=='e'){
			seeBag();
		} else if(todo=='q'){
			eatFood();
		}
		system("cls");
	}
}
void game() {
	system("color 03");
	printf("\n\n\n\n\n");
	printf("                                          �X�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�[ \n");
	printf("					  �U       CHESTS IN         �U\n");
	printf("					  �U                         �U\n");
	printf("					  �U            THE MAPS     �U\n");
	printf("					  �U                         �U\n");
	printf("					  �U       C++ EDITON        �U\n");
	printf("                                          �^�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�a \n");
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x0B);
	printf("                                              ");
	int slogan_p=rand()%11;
	cout<<Blue_slogan[slogan_p]<<endl;
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x0C);
	printf("                                                   �´��½�\n");
	printf("                                             Through the Nether\n");
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x03);
	printf("\n\n\n\n\n");
	printf("						���������ʼ��Ϸ...\n\n\n\n\n\n\n\n\n\n\n\n");
	printf("Alpha 0.8.1(���԰�)\n");
	system("pause");
	system("cls");
	printf("��Ϸѡ��:\n");
	printf("��ͼ��С(5-20):[  ]\b\b\b");
	scanf("%d",&n);
	n=max(5,n),n=min(20,n);
	printf("����([0]�� [1]��):[ ]\b\b");
	scanf("%d",&is_order);
	quickTeach();
	system("pause");
	system("cls");
	while(1) {
		hp=20;
		full=20;
		flag=0;
		memset(a,0,sizeof(a));
		memset(vis,false,sizeof(vis));
		while(1) {
			int MapX,MapY;//������ͼ�����
			MapX=rand()%(n+1),MapY=rand()%(n+1);
			if(MapX==0) MapX++;
			if(MapY==0) MapY++;
			makeMp(MapX,MapY);
			checkRoad(2,2);//�Ƿ���·�ܵ��յ�
			if(flag==1) {
				break;
			}
			flag=0;//��ʼ��
			memset(vis,false,sizeof(vis));
		}
		zombieS=n/3;
		skeletonS=2;
		for(int i=1; i<=rand()%n; i++){
			int gx=rand()%(n+1),gy=rand()%(n+1);
			if(gx==0) gx++;
			if(gy==0) gy++;
			a[gx][gy]=8;
		}
		for(int i=1; i<=zombieS; i++) {//���ɽ�ʬ  
			zombieX[i]=rand()%(n+1),zombieY[i]=rand()%(n+1);
			if(zombieX[i]==0) zombieX[i]++;
			if(zombieY[i]==0) zombieY[i]++;
			if(zombieX[i]==n-1) zombieX[i]--;
			if(zombieY[i]==n-1) zombieY[i]--;
			a[zombieX[i]][zombieY[i]]=9;
			zombieHp[i]=3;
		}
		for(int i=1; i<=skeletonS; i++){//�������� 
			skeletonX[i]=rand()%(n+1),skeletonY[i]=rand()%(n+1);
			if(skeletonX[i]==0) skeletonX[i]++;
			if(skeletonY[i]==0) skeletonY[i]++;
			if(skeletonX[i]==n-1) skeletonX[i]--;
			if(skeletonY[i]==n-1) skeletonY[i]--;
			a[skeletonX[i]][skeletonY[i]]=14;
		}
		memset(arrowX,0,sizeof(arrowX));
		memset(arrowY,0,sizeof(arrowY));
		x=2,y=2;
		a[x][y]=10;
		a[n-1][n-1]=11;
//������ͼ 
		while(1) {
			for(int i=1;i<=zombieS;i++) {//��ʱ��Ⱦ����
				if(zombieHp[i]==3) a[zombieX[i]][zombieY[i]]=9;
				else if(zombieHp[i]==2) a[zombieX[i]][zombieY[i]]=12;
				else if(zombieHp[i]==1) a[zombieX[i]][zombieY[i]]=13;
			}
			for(int i=1;i<=skeletonS;i++){
				if(skeletonHp[i]==3) a[skeletonX[i]][skeletonY[i]]=14;
				else if(skeletonHp[i]==2) a[skeletonX[i]][skeletonY[i]]=15;
				else if(skeletonHp[i]==1) a[skeletonX[i]][skeletonY[i]]=16;
			}
			if(step>0&&step%10==0&&full>0){//���±�ʳ��
				full--;
			}
			if(full==20){
				hp++;
				hp=min(hp,20);
			}
			if(full==0){
				hp--;
				if(hp<=0){
					died_Information="You starved to death.";
				}
			}
			if(hp<=0){
				memset(sum,0,sizeof(sum));
				money=0;
				hp=20;
				a[x][y]=0;
				system("cls");
				system("color CF");
				printf("\n\n\n\n\n\n\n");
				printf("                                    �����ˣ�\n\n\n");
				printf("   The information of you dies:");
				cout<<died_Information;
				printf("\n\n\n");
				int YN;
				printf("                      [0]�˳���Ϸ [1]���� [2]���ر�����Ļ");
				arrowS=0;
				memset(arrowX,0,sizeof(arrowX));
				memset(arrowY,0,sizeof(arrowY));
				is_act_door=0;
				scanf("%d",&YN);
				if(YN==0) {
					return ;
				}
				if(YN==1) {
					system("color 03");
					break;
				}
				if(YN==2) {
					system("cls");
					game();
					return ;
				}
			}
			if(x==n-1&&y==n-1&&is_act_door==1){
				a[x][y]=0;
				arrowS=0;
				memset(arrowX,0,sizeof(arrowX));
				memset(arrowY,0,sizeof(arrowY));
				is_act_door=0;
				game_nether();
				system("cls");
				system("color 03");
				break;
			}
			if(x==n-1&&y==n-1) {
				printf("\n\n\n\n\n\n");
				printf("                           666,�㵽���յ�!\n\n\n");
				int YN;
				printf("                      [0]�˳� [1]���� [2]�����̵�\n");
				scanf("%d",&YN);
				arrowS=0;
				memset(arrowX,0,sizeof(arrowX));
				memset(arrowY,0,sizeof(arrowY));
				is_act_door=0;
				if(YN==0) {
					return ;
				}
				if(YN==1) {
					break;
				}
				if(YN==2) {
					shop();
					break;
				}
			}
			system("cls");
			a[x][y]=10;
			Biome_Fest=0;
			for(int i=1;i<=zombieS;i++){//��ʬ�ƶ� 
				if(abs(zombieX[i]-x)<3&&abs(zombieY[i]-y)<3&&zombieX[i]!=0&&zombieY[i]!=0){
					int zombieType=a[zombieX[i]][zombieY[i]];
					a[zombieX[i]][zombieY[i]]=0;
					if(x<zombieX[i]&&a[zombieX[i]-1][zombieY[i]]<5) zombieX[i]--;
					else if(x>zombieX[i]&&a[zombieX[i]+1][zombieY[i]]<5) zombieX[i]++;
					else if(y<zombieY[i]&&a[zombieX[i]][zombieY[i]-1]<5) zombieY[i]--;
					else if(y>zombieY[i]&&a[zombieX[i]][zombieY[i]+1]<5) zombieY[i]++;
					a[zombieX[i]][zombieY[i]]=zombieType;
				}
			}
			for(int i=1;i<=skeletonS;i++){//�����ƶ�  
				if((skeletonX[i]!=x || skeletonY[i]!=y)&&skeletonX[i]!=0&&skeletonY[i]!=0){
					int skeletonType=a[skeletonX[i]][skeletonY[i]];
					a[skeletonX[i]][skeletonY[i]]=0;
					if(skeletonX[i]>x && a[skeletonX[i]-1][skeletonY[i]]<5) skeletonX[i]--;
					else if(skeletonX[i]<x && a[skeletonX[i]+1][skeletonY[i]]<5) skeletonX[i]++;
					else if(skeletonY[i]>y && a[skeletonX[i]][skeletonY[i]-1]<5) skeletonY[i]--;
					else if(skeletonY[i]<y && a[skeletonX[i]][skeletonY[i]+1]<5) skeletonY[i]++;
					a[skeletonX[i]][skeletonY[i]]=skeletonType;
				}
			}
			for(int i=1;i<=arrowS;i++){//��ʸ�ƶ� 
				if(arrowX[i]!=0&&arrowY[i]!=0&&a[arrowX[i]+cx[arrowFx[i]]][arrowY[i]+cy[arrowFx[i]]]<5){
					a[arrowX[i]][arrowY[i]]=0;
					arrowX[i]+=cx[arrowFx[i]],arrowY[i]+=cy[arrowFx[i]];
					a[arrowX[i]][arrowY[i]]=17;
				}
				else if(!in(arrowX[i]+cx[arrowFx[i]],arrowY[i]+cy[arrowFx[i]])||a[arrowX[i]+cx[arrowFx[i]]][arrowY[i]+cy[arrowFx[i]]]){
					a[arrowX[i]][arrowY[i]]=0;
					arrowX[i]=0,arrowY[i]=0;
				}
			}
			for(int i=1;i<=skeletonS;i++){//������� 
				if(skeletonX[i]==x){
					if(skeletonY[i]<y&&a[skeletonX[i]][skeletonY[i]+1]<5&&abs(skeletonX[i]-x)<3&&abs(skeletonY[i]-y)<3){
						arrowS++;
						arrowX[arrowS]=skeletonX[i],arrowY[arrowS]=skeletonY[i]+1,arrowFx[arrowS]=0;
						a[arrowX[arrowS]][arrowY[arrowS]]=17;
					}
					else if(skeletonY[i]>y&&a[skeletonX[i]][skeletonY[i]-1]<5){
						arrowS++;
						arrowX[arrowS]=skeletonX[i],arrowY[arrowS]=skeletonY[i]-1,arrowFx[arrowS]=2;
						a[arrowX[arrowS]][arrowY[arrowS]]=17;
					}
				}
				else if(skeletonY[i]==y){
					if(skeletonX[i]<x&&a[skeletonX[i]+1][skeletonY[i]]<5&&abs(skeletonX[i]-x)<3&&abs(skeletonY[i]-y)<3){
						arrowS++;
						arrowX[arrowS]=skeletonX[i]+1,arrowY[arrowS]=skeletonY[i],arrowFx[arrowS]=1;
						a[arrowX[arrowS]][arrowY[arrowS]]=17;
					}
					else if(skeletonX[i]>x&&a[skeletonX[i]-1][skeletonY[i]]<5){
						arrowS++;
						arrowX[arrowS]=skeletonX[i]-1,arrowY[arrowS]=skeletonY[i],arrowFx[arrowS]=3;
						a[arrowX[arrowS]][arrowY[arrowS]]=17;
					}
				}
			}
			mp();
			for(int i=1;i<=zombieS;i++){//��⽩ʬ���� 
				for(int j=0;j<4;j++){
					int zo_killX=zombieX[i]+cx[j],zo_killY=zombieY[i]+cy[j];
					if(x==zo_killX&&y==zo_killY){
						hp-=2;
						if(hp<=0){
							died_Information="You were killed by the zombie.";
						}
						printf("��� �� ��ʬ%d(chest:zombie %d) ������\n",i,i);
					}
				}
			}
			for(int i=1;i<=arrowS;i++){//����ʸ���� 
				int ar_killX=arrowX[i]+cx[arrowFx[i]],ar_killY=arrowY[i]+cy[arrowFx[i]];
				if(x==ar_killX&&y==ar_killY){
					hp--;
					if(hp<=0){
						died_Information="You were killed by the arrow of the skeleton.";
					}
					printf("��� �� ��ʸ%d(chest:arrow %d) ������\n",i,i);
					a[arrowX[i]][arrowY[i]]=0;
					arrowX[i]=0,arrowY[i]=0;
				}
				for(int j=1;j<=zombieS;j++){
					if(a[ar_killX][ar_killY]==9) a[ar_killX][ar_killY]=12,a[arrowX[i]][arrowY[i]]=0,arrowX[i]=0,arrowY[i]=0;
					else if(a[ar_killX][ar_killY]==12) a[ar_killX][ar_killY]=13,a[arrowX[i]][arrowY[i]]=0,arrowX[i]=0,arrowY[i]=0;
					else if(a[ar_killX][ar_killY]==13){
						a[ar_killX][ar_killY]=0,a[arrowX[i]][arrowY[i]]=0,arrowX[i]=0,arrowY[i]=0;
					}
				}
				for(int j=1;j<=skeletonS;j++){
					if(a[ar_killX][ar_killY]==14) a[ar_killX][ar_killY]=15,a[arrowX[i]][arrowY[i]]=0,arrowX[i]=0,arrowY[i]=0;
					else if(a[ar_killX][ar_killY]==15) a[ar_killX][ar_killY]=16,a[arrowX[i]][arrowY[i]]=0,arrowX[i]=0,arrowY[i]=0;
					else if(a[ar_killX][ar_killY]==16){
						a[ar_killX][ar_killY]=0,a[arrowX[i]][arrowY[i]]=0,arrowX[i]=0,arrowY[i]=0;
					}
				}
			}
			char todo;
			todo=getch();
			int goX=x,goY=y;
			if(todo=='d'||todo=='s'||todo=='a'||todo=='w') {
				if(todo=='d') goY++,fx=0;
				if(todo=='s') goX++,fx=1;
				if(todo=='a') goY--,fx=2;
				if(todo=='w') goX--,fx=3;
				if(in(goX,goY)&&(a[goX][goY]<5||a[goX][goY]==11||a[goX][goY]==17||a[goX][goY]==18)) {
					a[goX][goY]=10;
					a[x][y]=0;
					x=goX,y=goY;
					step++;
				}
			} else if(todo=='r') {
				return ;
			} else if(todo=='o') {
				goX=x,goY=y;
				if(fx==0) goY++,fx=0;
				if(fx==1) goX++,fx=1;
				if(fx==2) goY--,fx=2;
				if(fx==3) goX--,fx=3;
				if(in(goX,goY)&&(abs(goX-x)<2&&abs(goY-y)<2)&&a[goX][goY]==8) {
					chest();
					a[goX][goY]=0;
				}
			} else if(todo=='t'){
				quickTeach();
				system("pause");
			} else if(todo=='k'){
				for(int i=0;i<4;i++){
					int killX=x+cx[i],killY=y+cy[i];
					if(a[killX][killY]==9){
						a[killX][killY]=12;
						for(int j=1;j<=zombieS;j++){
							if(killX==zombieX[j]&&killY==zombieY[j]){
								zombieHp[j]--;
							}
						}
					}
					else if(a[killX][killY]==12){
						a[killX][killY]=13;
						for(int j=1;j<=zombieS;j++){
							if(killX==zombieX[j]&&killY==zombieY[j]){
								zombieHp[j]--;
							}
						}
					}
					else if(a[killX][killY]==13){
						a[killX][killY]=0;
						for(int j=1;j<=zombieS;j++){
							if(killX==zombieX[j]&&killY==zombieY[j]){
								int getZombieMeat=rand()%5;
								zombieX[j]=0,zombieY[j]=0;
								printf("��� ��ɱ�� ��ʬ %d,��ȡ ���� * %d\n",j,getZombieMeat);
								sum[11]+=getZombieMeat;
								Sleep(1000);
								break;
							}
						}
					}
					else if(a[killX][killY]==14){
						for(int j=1;j<=skeletonS;j++){
							if(killX==skeletonX[j]&&killY==skeletonY[j]){
								skeletonHp[j]--;
							}
						}
						a[killX][killY]=15;
					}
					else if(a[killX][killY]==15){
						for(int j=1;j<=skeletonS;j++){
							if(killX==skeletonX[j]&&killY==skeletonY[j]){
								skeletonHp[j]--;
							}
						}
						a[killX][killY]=16;
					}
					else if(a[killX][killY]==16){
						a[killX][killY]=0;
						for(int j=1;j<=skeletonS;j++){
							if(killX==skeletonX[j]&&killY==skeletonY[j]){
								int getBones=rand()%4;
								skeletonX[j]=0,skeletonY[j]=0;
								printf("��� ��ɱ�� ���� %d,��ȡ ��ͷ * %d\n",j,getBones);
								sum[12]+=getBones;
								Sleep(1000);
								break;
							}
						}
					}
					else{
						continue;
					}
				}
			} else if(todo=='u'){
				system("cls");
				useThing();
			} else if(todo=='e'){
				seeBag();
			} else if(todo=='q'){
				eatFood();
			} else if(todo=='/'&&is_order==1){
				string order;
				printf("/");
				getline(cin,order);
				if(order.substr(0,4) == "kill"){
					if(order.substr(11,12) == "chest:zombie"){
						if(order[24]>='1'&&order[24]<='6'){
							a[zombieX[order[24]-'0']][zombieY[order[24]-'0']]=0;
							zombieX[order[24]-'0']=0,zombieY[order[24]-'0']=0;
							printf("��ɱ�� chest:zombie %c\n",order[24]);
							Sleep(1000);
						} else if(order.substr(24,3) == "all"){
							for(int i=1;i<=zombieS;i++){
								a[zombieX[i]][zombieY[i]]=0;
								zombieX[i]=0,zombieY[i]=0;
								printf("��ɱ�� chest:zombie %d\n",i);
								Sleep(1000);
							}
						}
					} else if(order.substr(11,14) == "chest:skeleton"){
						if(order[26]>='1'&&order[26]<='6'){
							a[skeletonX[order[26]-'0']][skeletonY[order[26]-'0']]=0;
							skeletonX[order[26]-'0']=0,skeletonY[order[26]-'0']=0;
							printf("��ɱ�� chest:skeleton %c\n",order[26]);
							Sleep(1000);
						} else if(order.substr(26,3) == "all"){
							for(int i=1;i<=skeletonS;i++){
								a[skeletonX[i]][skeletonY[i]]=0;
								skeletonX[i]=0,skeletonY[i]=0;
								printf("��ɱ�� chest:skeleton %d\n",i);
								Sleep(1000);
							}
						}
					} else if(order.substr(11,12) == "chest:player"){
						hp=0,full=1;
						died_Information="You have been killed.";
					} else if(order.substr(11,3) == "all"){
						for(int i=1;i<=zombieS;i++){
							a[zombieX[i]][zombieY[i]]=0;
							zombieX[i]=0,zombieY[i]=0;
							printf("��ɱ�� chest:zombie %d\n",i);
							Sleep(1000);
						}
						for(int i=1;i<=skeletonS;i++){
							a[skeletonX[i]][skeletonY[i]]=0;
							skeletonX[i]=0,skeletonY[i]=0;
							printf("��ɱ�� chest:skeleton %d\n",i);
							Sleep(1000);
						}
						hp=0,full=1;
						died_Information="You have been killed.";
					}
				} else if(order.substr(0,2) == "tp"){
					a[x][y]=0;
					x=0,y=0;
					int order_p;
					for(order_p=3;;order_p++){//��ȡx 
						if(order[order_p]>='0'&&order[order_p]<='9'){
							x=x*10+int(order[order_p]-'0');
						}
						else{
							break;
						}
					}
					order_p=order_p+1;
					for(;;order_p++){//��ȡy 
						if(order[order_p]>='0'&&order[order_p]<='9'){
							y=y*10+int(order[order_p]-'0');
						}
						else{
							break;
						}
					}
				} else if(order.substr(0,8) == "beta_set"){
					int order_p,set_temp=0;
					string beta_name="";
					for(order_p=9;;order_p++){//��ȡbeta_name 
						if(order[order_p]!=' '){
							beta_name+=order[order_p];
						}
						else{
							break;
						}
					}
					for(order_p=9+beta_name.size()+1;;order_p++){//��ȡset_temp 
						if(order[order_p]>='0'&&order[order_p]<='9'){
							set_temp=set_temp*10+int(order[order_p]-'0');
						}
						else{
							break;
						}
					}
					if(beta_name.substr(0,1) == "a"){
						int change_x=0,change_y=0;
						bool flag=0;
						for(int i=2;;i++){
							if(beta_name[i]>='0'&&beta_name[i]<='9'&&flag==0){
								change_x=change_x*10+(beta_name[i]-'0');
							} else if(beta_name[i]>='0'&&beta_name[i]<='9'&&flag==1){
								change_y=change_y*10+(beta_name[i]-'0');
							}
							if(beta_name[i]==']'&&flag==0){
								flag=1;
							} else if(beta_name[i]==']'&&flag==1){
								break;
							}
						}
						a[change_x][change_y]=set_temp;
					} else if(beta_name.substr(0,1) == "x"){
						a[x][y]=0,x=set_temp,a[x][y]=10;
					} else if(beta_name.substr(0,1) == "y"){
						a[x][y]=0,y=set_temp,a[x][y]=10;
					} else if(beta_name.substr(0,5) == "money"){
						money=set_temp;
					} else if(beta_name.substr(0,2) == "hp"){
						hp=set_temp;
					} else if(beta_name.substr(0,4) == "full"){
						full=set_temp;
					} else if(beta_name.substr(0,3) == "sum"){
						int change_x=0;
						for(int i=4;;i++){
							if(beta_name[i]>='0'&&beta_name[i]<='9'){
								change_x=change_x*10+(beta_name[i]-'0');
							} else{
								break;
							}
						}
						sum[change_x]=set_temp;
					}
				} else{
					SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x0C);
					printf("ָ����Ч!\n");
					Sleep(1000);
					SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),0x03);
				}
			} else if(todo=='/'&&is_order==0){
				printf("��û�����׵�Ȩ��!\n");
				Sleep(3000);
			} else if(todo=='1'){
				is_debug=!is_debug;
			}
			Sleep(1);
			system("cls");
		}
//��Ϸ
	}
}
int main() {
	srand(time(0));
	game();
	return 0;
}
