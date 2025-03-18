import { ExampleForm } from 'components/form-example'
import { ScrollView } from 'react-native'

export default function Home() {
  return (
    <ScrollView
      className="flex-1 bg-black-500"
      contentContainerClassName="flex-col items-center justify-center gap-10 py-10">
      <ExampleForm />
      {/* <View className="flex flex-1 flex-col items-center justify-center gap-10 bg-transparent py-10">
        <Input editable={false} icon={User} iconSide="left" placeholder="Placeholder" />
        <Input icon={User} error iconSide="right" placeholder="Placeholder" />
      </View>
      <View className="flex-1 flex-col items-center justify-center gap-10 bg-black-900 py-10">
        <View className="flex-col items-center justify-center gap-4">
          <Text className="text-xl font-bold text-white">Disable</Text>
          <Button disabled onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button default</Button.Text>
          </Button>
          <Button disabled size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
          <Button onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button default</Button.Text>
          </Button>
          <Button size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
        </View>
        <View className="flex-col items-center justify-center gap-4">
          <Text className="text-xl font-bold text-white">Disable</Text>
          <Button disabled variant="outline" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button outline</Button.Text>
          </Button>
          <Button disabled variant="outline" size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
          <Button variant="outline" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button outline</Button.Text>
          </Button>
          <Button variant="outline" size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
        </View>
        <View className="flex-col items-center justify-center gap-4">
          <Text className="text-xl font-bold text-white">Disable</Text>
          <Button disabled variant="ghost" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button ghost</Button.Text>
          </Button>
          <Button disabled variant="ghost" size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
          <Button variant="ghost" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button ghost</Button.Text>
          </Button>
          <Button variant="ghost" size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
        </View>
        <View className="flex-col items-center justify-center gap-4">
          <Text className="text-xl font-bold text-white">Disable</Text>
          <Button disabled variant="destructiveGhost" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button destructiveGhost</Button.Text>
          </Button>
          <Button
            disabled
            variant="destructiveGhost"
            size="icon"
            onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
          <Button variant="destructiveGhost" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button destructiveGhost</Button.Text>
          </Button>
          <Button variant="destructiveGhost" size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
        </View>
        <View className="flex-col items-center justify-center gap-4">
          <Text className="text-xl font-bold text-white">Disable</Text>
          <Button disabled variant="destructiveOutline" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button destructiveOutline</Button.Text>
          </Button>
          <Button
            disabled
            variant="destructiveOutline"
            size="icon"
            onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
          <Button variant="destructiveOutline" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button destructiveOutline</Button.Text>
          </Button>
          <Button variant="destructiveOutline" size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
        </View>
        <View className="flex-col items-center justify-center gap-4">
          <Text className="text-xl font-bold text-white">Disable</Text>
          <Button disabled variant="destructive" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button destructive</Button.Text>
          </Button>
          <Button disabled variant="destructive" size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
          <Button variant="destructive" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
            <Button.Text>Button destructive</Button.Text>
          </Button>
          <Button variant="destructive" size="icon" onPress={() => console.log('clicked')}>
            <Button.Icon>
              <File size={16} />
            </Button.Icon>
          </Button>
        </View>
      </View> */}
    </ScrollView>
  )
}
